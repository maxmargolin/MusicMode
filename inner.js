var prevID = 0;
var prevSRC = "0";
var ee = 0; //end argument in url
window.lastStarSkipID = 1;
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
        console.log(document.getElementById('skipBar' + aa + "x" + bb));
        if (document.getElementById('skipBar' + aa + "x" + bb) == null) {
                var bar = document.getElementsByClassName("ytp-progress-list")[0];
                if (bar == undefined) {
                        bar = document.getElementsByClassName("progress-bar-played")[0];
                }
                if (bar != undefined) {
                        var skipBar = document.createElement("div");
                        skipBar.setAttribute("class", "skipBar");
                        skipBar.setAttribute("data-vid", location.href.match(/v\=(.{11})/)[1]);
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
                                if (barArea == undefined) {
                                        barArea = document.getElementsByClassName("progress-bar-line")[0];
                                        skipBar.setAttribute("style", "position: absolute; left: " + left + "%; width: " + right + "%; background-color: lightgreen;")
                                }
                                barArea.insertBefore(skipBar, bar);
                        }
                }
        }
}






function act(id, data, video, totalDuration, currentTime, toCheck) {
        toRet = toCheck.slice();
        if (data != undefined && data[id[1]] != undefined && data[id[1]][0] != undefined) {
                toRet[0] = false;
                var startpoint = data[id[1]][0];
                if (startpoint > 0) {}
                //safety
                if (toCheck[0]) { //start
                        ShowSkipOnBar(0, startpoint);
                        if (id[1] != lastStarSkipID) {
                                if (currentTime > 0.05 && startpoint > 0 && inSkipRange(currentTime, 0)) {
                                        video.currentTime = startpoint;
                                        TotalTimeUpdate(startpoint - currentTime);

                                }
                                lastStarSkipID = id[1];
                        }
                }

                if (toCheck[1]) { //mid
                        for (var i = 1; i < data[id[1]].length - 1; i += 2) {
                                toRet[1] = false;
                                var skipFrom = data[id[1]][i];
                                var skipTo = data[id[1]][i + 1];
                                if (skipFrom != 0 && skipTo != 0) {
                                        ShowSkipOnBar(skipFrom, skipTo);
                                        if (inSkipRange(currentTime, skipFrom)) {
                                                video.currentTime = skipTo;
                                                TotalTimeUpdate(skipTo - currentTime);
                                        }
                                }
                        }
                }
                var end = data[id[1]][data[id[1]].length - 1]; //unless theres no end
                if ((data[id[1]].length % 2) == 0 && end != undefined)
                        toRet[2] = false;
                if (end < 0)
                        end = parseInt(video.duration + end); // end skip calculated to this specific video,remember end is negative

                if (toCheck[2] && end > 0 && (data[id[1]].length % 2) == 0) {
                        toRet[2] = false;
                        ShowSkipOnBar(end, totalDuration);
                        if (currentTime >= end && currentTime < Math.floor(totalDuration)) {
                                video.currentTime = totalDuration - 0.05; //dont skip to start
                                TotalTimeUpdate(totalDuration - currentTime);
                        }
                }
        }

        return toRet;
}

function InSkipper() {
        chrome.storage.local.get("on", function(result) {
                try {


                        var src = document.getElementsByClassName("html5-main-video")[0].getAttribute("src");
                        var link = String(document.getElementsByClassName("ytp-title-link yt-uix-sessionlink")[0]);

                        var vID = link.match(/v\=(.{11})/);

                        if (vID == undefined || vID == null) { //tv format ?
                                //link = document.getElementById("atr_challenge");
                                //vID = link.value.match(/e\=(.{11})/); //for foramts like this : www.youtube.com/tv#/watch/video/control?v=ckM97kSinLw
                                var url = location.href; //current url
                                if (url.includes("/tv")) { //tv format
                                        vID = url.match(/v\=(.{11})/); //regex for ID
                                }
                        }
                        try {
                                if (vID === null || vID === undefined)
                                        vID = ["I really Need To ReWritethings here but unfortunaly this isnt my full tie job =/", document.getElementById("page-manager").children[0].getAttribute("video-id")];

                        } catch (err) {;
                        }

                        if (vID[1] === null || vID[1] === undefined)
                                vID = ["it gets worse", document.getElementById("page-manager").children[1].getAttribute("video-id")];
                        if (vID == undefined || (prevID != vID[1]) || (prevSRC != src)) //video change
                        {
                                ee = 0;
                                delmarks();
                        }

                        prevSRC = src;
                        prevID = vID[1];



                } catch (err) {
                        delmarks();

                        console.log("deleted");
                }
                if (result["on"] && vID != undefined) {
                        var curl = location.href; //current url
                        var ends = curl.match(/end\=(.*)/);
                        if (ends != null)
                                ee = ends[1];

                        try {
                                var owner = undefined;
                                var cID = undefined;
                                try {
                                        var owner = document.getElementById("owner-container").firstChild.firstChild;
                                        var cID = owner.getAttribute("href").match(/channel.(.*)/);
                                } catch (err) {}
                                let video = document.querySelector("video.html5-main-video");
                                let currentTime = video.currentTime; // Fractional, in seconds
                                let totalDuration = video.duration;

                                var checkStartMidEnd = [true, true, true]; //start mid end
                                chrome.storage.sync.get(vID[1], function(svRes) {
                                        checkStartMidEnd = act(vID, svRes, video, totalDuration, currentTime, checkStartMidEnd);
                                });

                                //local
                                if (vID[1] != undefined)
                                        chrome.storage.local.get(vID[1], function(result) {
                                                if (result == undefined || result[vID[1]] == undefined || result[vID[1]][0] == undefined) {
                                                        var foundSyncedChannelData = false;
                                                        if (cID != undefined) {
                                                                chrome.storage.sync.get(cID[1], function(res) {
                                                                        // run on synced cID
                                                                        if (res != undefined && res[cID[1]] != undefined) {
                                                                                foundSyncedChannelData = true;
                                                                        }
                                                                        checkStartMidEnd = act(cID, res, video, totalDuration, currentTime, checkStartMidEnd);
                                                                });
                                                        }
                                                        if (!foundSyncedChannelData && cID != undefined) {
                                                                chrome.storage.local.get(cID[1], function(rez) {
                                                                        // run on local cID
                                                                        var year = (document.getElementsByClassName("date")[0].textContent).match(/ (\d{4})/)[0];
                                                                        var totalVideoTime = document.querySelector("video.html5-main-video").duration;
                                                                        if (!foundSyncedChannelData && year >= 2012 && totalVideoTime > 120 && totalVideoTime < 1200) //only 2012 and after for public channel skips
                                                                                checkStartMidEnd = act(cID, rez, video, totalDuration, currentTime, checkStartMidEnd);
                                                                });
                                                        }

                                                }
                                                //run on vID
                                                checkStartMidEnd = act(vID, result, video, totalDuration, currentTime, checkStartMidEnd);

                                        });

                                if (ee > 0)
                                        ShowSkipOnBar(ee, totalDuration, "purple");
                                if (ee > 0 && currentTime > ee && currentTime < totalDuration - 1)
                                        video.currentTime = totalDuration - 0.05;

                        } catch (err) {}

                }

                var potential = document.getElementsByClassName("skipBar");
                for (var i = 0; i < potential.length; i++) {
                        if (potential[i].getAttribute("data-vid") !== vID[1]); {
                                console.log(potential[i].getAttribute("data-vid") + " X " + vID[1]);
                                potential[i].className += " toDel"
                        }
                }

                var toDel = document.getElementsByClassName("toDel");
                while (toDel[0]) {
                        toDel[0].parentNode.removeChild(toDel[0]);
                }


        });

}

function inSkipRange(current_time, skip_time) {
        return (current_time >= skip_time && current_time <= skip_time + 2);
}
