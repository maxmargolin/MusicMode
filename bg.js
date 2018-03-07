try { //updates

        chrome.storage.local.get("version", function(result) {
                chrome.storage.local.get("dblength", function(len) {
                        if (result == null || len == null || result["version"] == null || result["version"] != len["dblength"]) {
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




        chrome.storage.sync.get("uidBeta", function(rz) {
                if (rz["uidBeta"] == undefined) {
                        var text = "";
                        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                        for (var i = 0; i < 10; i++)
                                text += possible.charAt(Math.floor(Math.random() * possible.length));
                        var obj = {};
                        obj["uidBeta"] = text;
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
                while (elements[0])
                        elements[0].parentNode.removeChild(elements[0]);
        } catch (e) {}
}
//skip part of video
function process() {
        delmarks();
        chrome.storage.local.get("ChangeURL", function(result) {
                if (result["ChangeURL"]) {
                        try {
                                var curl = location.href; //current url
                                var vID = curl.match(/v\=(.{11})/); //regex for ID
                                var owner = document.getElementById("owner-container").firstChild.firstChild;
                                var cID = owner.getAttribute("href").match(/channel.(.*)/);

                                var timed = (curl.includes("\&t\=") || curl.includes("\?t\="));
                                if (!timed) { //only if video is not timed

                                        chrome.storage.local.get("on", function(result) {
                                                if (result != null && result["on"] && vID) { //sync storage beforelocal
                                                        chrome.storage.sync.get(vID[1], function(result) {
                                                                if (!(result[vID[1]] == undefined || result[vID[1]][0] == undefined || result[vID[1]][0] == 0)) {
                                                                        window.location.replace(location.href + "&t=" + result[vID[1]][0]); //change url
                                                                        TotalTimeUpdate(result[vID[1]][0]);

                                                                } else if (vID != undefined && vID[1] != undefined) {
                                                                        chrome.storage.local.get(vID[1], function(result) {
                                                                                if (!(result[vID[1]] == undefined || result[vID[1]][0] === undefined || result[vID[1]][0] == 0)) {
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
                }
        });
        delmarks();
}

function TotalTimeUpdate(toAdd) {
        chrome.storage.sync.get("totalTime", function(time) {
                var newTime = {};
                newTime["totalTime"] = parseInt(time["totalTime"]) + parseInt(toAdd);
                chrome.storage.sync.set(newTime);
        });
}
