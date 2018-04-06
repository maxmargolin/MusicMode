var prevID = 0;
var ee = 0;

setInterval(InSkipper, 400);



//popup is requesting id
chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
                //popup is requesting id
                if (request.req == "redraw") {
                        delmarks();
                } else if (request.req == "id") {
                        var curl = location.href;
                        var vID = curl.match(/v\=(.{11})/);
                        var owner = document.getElementById("owner-container").firstChild.firstChild;
                        var date = document.getElementsByClassName("date")[0].textContent;
                        var cID = owner.getAttribute("href").match(/channel.(.*)/);
                        let video = document.querySelector("video.html5-main-video");
                        let totalDuration = video.duration;
                        var title = document.getElementsByClassName("title style-scope ytd-video-primary-info-renderer")[0].textContent; //title
                        var vs = (document.getElementsByClassName('view-count')[0]).innerHTML.match(/((\d|,)+)/);
                        sendResponse({
                                cvID: vID[1],
                                ccID: cID[1],
                                name: title,
                                views: vs[0],
                                vLength: totalDuration,
                                published: date

                        });

                }

        });


function ShowSkipOnBar(aa, bb, color = "a") {
        if (document.getElementById('skipBar' + aa + "x" + bb) == null) {
                var bar = document.getElementsByClassName("ytp-progress-list")[0];
                var skipBar = document.createElement("div");
                skipBar.setAttribute("class", "skipBar");
                skipBar.setAttribute("id", "skipBar" + aa + "x" + bb);
                let vid = document.querySelector("video.html5-main-video");
                let tx = vid.duration;
                if (tx != null && tx > 0) {
                        //skipBar.setAttribute("title", "skipper");
                        var left = 100 * aa / tx;
                        var right = (100 * (bb - aa) / tx) - 0.1;
                        if (color == "a")
                                skipBar.setAttribute("style", "position: absolute; left: " + left + "%; width: " + right + "%; height: 50%; background-color: lightgreen; border: 1px solid black;")
                        else
                                skipBar.setAttribute("style", "position: absolute; left: " + left + "%; width: " + right + "%; height: 50%; background-color: " + color + "; border: 1px solid black;")

                        var barArea = document.getElementsByClassName("ytp-progress-bar")[0]; // Get the <ul> element to insert a new node
                        barArea.insertBefore(skipBar, bar);
                }
        }
}






function act(id, data, video, totalDuration, currentTime, checkStart, checkMid, checkEnd) {
        if (data != undefined && data[id[1]] != undefined && data[id[1]][0] != undefined) {
                var lstartpoint = data[id[1]][0];
                //safety
                if (checkStart) {
                        ShowSkipOnBar(0, lstartpoint);
                        if (currentTime > 0.1 && lstartpoint > 0 && inSkipRange(currentTime, 0) && lstartpoint > 1) {
                                TotalTimeUpdate(lstartpoint - currentTime);
                                video.currentTime = lstartpoint;
                        }
                }

                if (checkMid) {
                        for (var i = 1; i < data[id[1]].length - 1; i += 2) {
                                var skipFrom = data[id[1]][i];
                                var skipTo = data[id[1]][i + 1];
                                ShowSkipOnBar(skipFrom, skipTo);
                                if (inSkipRange(currentTime, skipFrom)) {
                                        video.currentTime = skipTo;
                                        TotalTimeUpdate(skipTo - currentTime);
                                }
                        }
                }

                var end = data[id[1]][data[id[1]].length - 1];
                if (end < 0)
                        end = parseInt(video.duration + end); // end skip calculated to this specific video,remember end is negative
                if (checkEnd && end > checkStart && (data[id[1]].length % 2) == 0) {
                        ShowSkipOnBar(end, totalDuration);
                        if (currentTime >= end && currentTime < Math.floor(totalDuration)) {
                                video.currentTime = totalDuration-0.05; //dont skip to start
                                TotalTimeUpdate(totalDuration - currentTime);
                        }
                }
        }
}

function InSkipper() {

        chrome.storage.local.get("on", function(result) {
                try {
                        var link = String(document.getElementsByClassName("ytp-title-link yt-uix-sessionlink")[0]);
                        var vID = link.match(/v\=(.{11})/);
                        var owner = document.getElementById("owner-container").firstChild.firstChild;
                        var cID = owner.getAttribute("href").match(/channel.(.*)/);
                        if (prevID != vID[1]) //video change
                        {
                                ee = 0;
                                delmarks();
                        }
                        prevID = vID[1];
                } catch (err) {}
                if (result["on"]) {
                        var curl = location.href; //current url
                        var ends = curl.match(/end\=(.*)/);
                        if (ends != null)
                                ee = ends[1];

                        try {
                                let video = document.querySelector("video.html5-main-video");
                                let currentTime = video.currentTime; // Fractional, in seconds
                                let totalDuration = video.duration;
                                var localStart = true;
                                var localEnd = true;
                                var localMid = true;
                                chrome.storage.sync.get(vID[1], function(result) {
                                        var startpoint = 0;
                                        if (result && vID && vID[1] && result[vID[1]])
                                                startpoint = result[vID[1]][0];
                                        if (startpoint != 0)
                                                ShowSkipOnBar(0, startpoint);
                                        //no need for local start point
                                        if (startpoint > 0)
                                                localStart = false;
                                        //safety
                                        if (currentTime > 0.03 && startpoint > 0 && inSkipRange(currentTime, 0) && startpoint > 1) {
                                                TotalTimeUpdate(startpoint - currentTime);
                                                video.currentTime = startpoint;
                                        }

                                        if (result[vID[1]]) {
                                                for (var i = 1; i < result[vID[1]].length - 1; i += 2) {
                                                        localMid = false;
                                                        var skipFrom = result[vID[1]][i];
                                                        var skipTo = result[vID[1]][i + 1];

                                                        ShowSkipOnBar(skipFrom, skipTo);
                                                        if (skipTo - skipFrom > 1) {

                                                                if (inSkipRange(currentTime, skipFrom)) {
                                                                        video.currentTime = skipTo;
                                                                        TotalTimeUpdate(skipTo - currentTime);
                                                                }
                                                        }
                                                }


                                                var endpoint = result[vID[1]][result[vID[1]].length - 1];
                                                if (endpoint > 0) {
                                                        ShowSkipOnBar(endpoint, totalDuration);
                                                        localEnd = false;
                                                }
                                                if ((result[vID[1]].length % 2) == 0 && currentTime >= endpoint && endpoint != 0 && Math.floor(currentTime < totalDuration)) {
                                                        video.currentTime = Math.ceil(totalDuration);
                                                        TotalTimeUpdate(totalDuration - currentTime);
                                                }
                                        }
                                });

                                //local
                                if (vID[1] != undefined)
                                        chrome.storage.local.get(vID[1], function(result) {
                                                if (result == undefined || result[vID[1]] == undefined || result[vID[1]][0] == undefined) {
                                                        var foundSyncedChannelData = false;
                                                        chrome.storage.sync.get(cID[1], function(res) {
                                                                // run on synced cID
                                                                if (res != undefined && res[cID[1]] != undefined) {
                                                                        foundSyncedChannelData = true;
                                                                }
                                                                act(cID, res, video, totalDuration, currentTime, localStart, localMid, localEnd);
                                                        });
                                                        if (!foundSyncedChannelData) {
                                                                chrome.storage.local.get(cID[1], function(rez) {
                                                                        // run on local cID
                                                                        var year = (document.getElementsByClassName("date")[0].textContent).match(/ (\d{4})/)[0];
                                                                        var totalVideoTime=document.querySelector("video.html5-main-video").duration;
                                                                        if (!foundSyncedChannelData && year >= 2012 &&totalVideoTime>120 &&totalVideoTime<1200) //only 2012 and after for public channel skips
                                                                                act(cID, rez, video, totalDuration, currentTime, localStart, localMid, localEnd);
                                                                });
                                                        }

                                                }
                                                //run on vID
                                                act(vID, result, video, totalDuration, currentTime, localStart, localMid, localEnd);

                                        });

                                if (ee > 0)
                                        ShowSkipOnBar(ee, totalDuration, "purple");
                                if (ee > 0 && currentTime > ee && currentTime < totalDuration - 1)
                                        video.currentTime = Math.ceil(totalDuration);
                        } catch (err) {}
                }

        });
}

function inSkipRange(current_time, skip_time) {
        return (current_time >= skip_time && current_time <= skip_time + 1);
}
