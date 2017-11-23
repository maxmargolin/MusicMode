try { //updates

        chrome.storage.local.get("version", function(result) {
                chrome.storage.local.get("dblength", function(len) {
                        if (result == null || len == null || result["version"] == null || result["version"] < len["dblength"]) {
                                var db = get_data();
                                //add to local storage
                                var pushedNow = 0;
                                var obj = {};

                                for (var i = 0; i < db.length; i++) {
                                        obj[db[i][0]] = db[i].slice(1);
                                        pushedNow++;
                                        chrome.storage.local.set(obj);
                                }

                                //items in local
                                obj = {};
                                obj["version"] = pushedNow;
                                chrome.storage.local.set(obj);
                        }
                });
        });


} catch (e) {}
try {
        //pushes

        //initial on
        chrome.storage.local.get("on", function(on) {
                if (on["on"] != false) {
                        var obj = {};
                        obj["on"] = true;
                        chrome.storage.local.set(obj);
                }
        });

        //begin counting total
        chrome.storage.sync.get("totalTime", function(time) {
                if (time["totalTime"] == undefined) {
                        var obj = {};
                        obj["totalTime"] = 0;
                        chrome.storage.sync.set(obj);
                }
        });
        //times clicked save
        chrome.storage.sync.get("SaveCount", function(c1) {

                if (c1["SaveCount"] == undefined) {
                        var obj = {};
                        obj["SaveCount"] = 0;
                        chrome.storage.sync.set(obj);
                }
        });



        //times clicked rate
        chrome.storage.sync.get("RateCount", function(c2) {
                if (c2["RateCount"] == undefined) {
                        var obj = {};
                        obj["RateCount"] = 0;
                        chrome.storage.sync.set(obj);
                }
        });
} catch (e) {}



//cach the change
window.addEventListener("spfdone", process); // old youtube design
window.addEventListener("yt-navigate-start", process); // new youtube design

document.addEventListener("DOMContentLoaded", process); // one-time early processing
window.addEventListener("load", process); // one-time late postprocessing






function delmarks() {
        try {
                var elements = document.getElementsByClassName('skipBar');
                elements[0].parentNode.removeChild(elements[0]);
        } catch (e) {}
}
//skip part of video
function process() {
        delmarks();
        try {
                var curl = location.href; //current url
                var vID = curl.match(/v\=(.{11})/); //regex for ID

                var timed = (curl.includes("\&t\=") || curl.includes("\?t\="));
                if (!timed) { //only if video is not timed

                        chrome.storage.local.get("on", function(result) {
                                if (result["on"]) { //sync storage beforelocal
                                        chrome.storage.sync.get(vID[1], function(result) {
                                                if (!(result[vID[1]] == undefined || result[vID[1]][0] == undefined || result[vID[1]][0] == 0)) {
                                                        window.location.replace(location.href + "&t=" + result[vID[1]][0]); //change url
                                                        TotalTimeUpdate(result[vID[1]][0]);

                                                } else {
                                                        chrome.storage.local.get(vID[1], function(result) {
                                                                if (!(result[vID[1]][0] === undefined || result[vID[1]][0] == 0)) {
                                                                        window.location.replace(location.href + "&t=" + result[vID[1]][0]); //change url

                                                                        TotalTimeUpdate(result[vID[1]][0]);

                                                                }
                                                        });
                                                }
                                        });
                                }
                        });

                }
        } catch (e) {}
        delmarks();
}

function TotalTimeUpdate(toAdd) {
        chrome.storage.sync.get("totalTime", function(time) {
                var newTime = {};
                newTime["totalTime"] = parseInt(time["totalTime"]) + parseInt(toAdd);
                chrome.storage.sync.set(newTime);
        });
}
