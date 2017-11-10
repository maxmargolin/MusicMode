setInterval(InSkipper, 444);



var prevID = 0;
var draw = false;

function ShowSkipOnBar(aa, bb) {
        if (draw) {
                var bar = document.getElementsByClassName("ytp-progress-list")[0];
                var skipBar = document.createElement("div");
                skipBar.setAttribute("class", "skipBar");
                let vid = document.querySelector("video.html5-main-video");
                let tx = vid.duration;
                var left = 100 * aa / tx;
                var right = (100 * (bb - aa) / tx) - 0.1;
                skipBar.setAttribute("style", "position: absolute; left: " + left + "%; width: " + right + "%; height: 50%; background-color: lightgreen; border: 1px solid black;")
                var barArea = document.getElementsByClassName("ytp-progress-bar")[0]; // Get the <ul> element to insert a new node
                barArea.insertBefore(skipBar, bar);
        }
}

function InSkipper() {

        chrome.storage.local.get("on", function(result) {
                if (result["on"]) {
                        var link = String(document.getElementsByClassName("ytp-title-link yt-uix-sessionlink")[0]);
                        var vID = link.match(/v\=(.{11})/);
                        if (prevID != vID[1]) //video change
                        {
                                draw = true;
                                delmarks();
                        }
                        prevID = vID[1];
                        let video = document.querySelector("video.html5-main-video");
                        let currentTime = video.currentTime; // Fractional, in seconds
                        let totalDuration = video.duration;
                        //var vID = location.href.match(/v\=(.{11})/);

                        var localStart = true;
                        var localEnd = true;
                        var localMid = true;
                        chrome.storage.sync.get(vID[1], function(result) {


                                var startpoint = result[vID[1]][0];
                                ShowSkipOnBar(0, startpoint);
                                //no need for local start point
                                if (startpoint > 0)
                                        localStart = false;
                                //safety
                                if (currentTime > 0.03 && startpoint > 0 && inSkipRange(currentTime, 0) && startpoint > 1) {
                                        TotalTimeUpdate(startpoint - currentTime);
                                        video.currentTime = startpoint;
                                }

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
                        });

                        //local
                        chrome.storage.local.get(vID[1], function(result) {

                                var lstartpoint = result[vID[1]][0];
                                //safety
                                if (localStart) {
                                        ShowSkipOnBar(0, lstartpoint);
                                        if (currentTime > 0.1 && lstartpoint > 0 && inSkipRange(currentTime, 0) && lstartpoint > 1) {
                                                TotalTimeUpdate(lstartpoint - currentTime);
                                                video.currentTime = lstartpoint;

                                        }
                                }

                                if (localMid) {
                                        for (var i = 1; i < result[vID[1]].length - 1; i += 2) {
                                                var skipFrom = result[vID[1]][i];
                                                var skipTo = result[vID[1]][i + 1];
                                                ShowSkipOnBar(skipFrom, skipTo);
                                                if (inSkipRange(currentTime, skipFrom)) {
                                                        video.currentTime = skipTo;
                                                        TotalTimeUpdate(skipTo - currentTime);
                                                }
                                        }
                                }

                                var end = result[vID[1]][result[vID[1]].length - 1];
                                if (localEnd && end > localStart && (result[vID[1]].length % 2) == 0) {
                                        ShowSkipOnBar(end, totalDuration);
                                        if (currentTime >= end && Math.floor(currentTime < totalDuration)) {
                                                video.currentTime = Math.ceil(totalDuration);
                                                TotalTimeUpdate(totalDuration - currentTime);
                                        }
                                }
                        });


                }
        });
}

function inSkipRange(current_time, skip_time) {
        return (current_time >= skip_time && current_time <= skip_time + 1);
}
