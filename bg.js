chrome.storage.local.get("version", function(result) {
        var currentDBVersion = 36; //change to force update
        if (result == null || result["version"] == null || result["version"][0] != currentDBVersion) {
                var db = get_data(currentDBVersion);

                //add to local storage
                for (var i = 0; i < db.length; i++) {
                        var obj = {};
                        obj[db[i][0]] = db[i].slice(1);
                        chrome.storage.local.set(obj);
                }


        }
});


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



//cach the change
window.addEventListener("spfdone", process); // old youtube design
window.addEventListener("yt-navigate-start", process); // new youtube design

document.addEventListener("DOMContentLoaded", process); // one-time early processing
window.addEventListener("load", process); // one-time late postprocessing



//popup is requesting id
chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
                //popup is requesting id
                if (request.req == "id") {
                        var curl = location.href;
                        var vID = curl.match(/v\=(.{11})/);
                        sendResponse({
                                farewell: vID[1]
                        });

                }

        });


//skip part of video
function process() {

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
}

function TotalTimeUpdate(toAdd) {
        chrome.storage.sync.get("totalTime", function(time) {
                var newTime = {};
                newTime["totalTime"] = parseInt(time["totalTime"]) + parseInt(toAdd);
                chrome.storage.sync.set(newTime);
        });
}
