setInterval(InSkipper, 500);




function InSkipper() {

        chrome.storage.local.get("on", function(result) {
                if (result["on"]) {
                        var link = String(document.getElementsByClassName("ytp-title-link yt-uix-sessionlink")[0]);
                        var vID = link.match(/v\=(.{11})/);
                        let video = document.querySelector("video.html5-main-video");
                        let currentTime = video.currentTime; // Fractional, in seconds
                        let totalDuration = video.duration;
                        //var vID = location.href.match(/v\=(.{11})/);

                        var localStart = true;
                        var localEnd = true;
                        var localMid = true;
                        chrome.storage.sync.get(vID[1], function(result) {


                                var startpoint = result[vID[1]][0];
                                //no need for local start point
                                if (startpoint > 0)
                                        localStart = false;
                                //safety
                                if (currentTime > 0.03 && startpoint > 0 && inSkipRange(currentTime, 0) && startpoint > 1) {
                                        TotalTimeUpdate(startpoint - currentTime);
                                        video.currentTime = startpoint;
                                }

                                for (var i = 1; i < result[vID[1]].length - 1; i += 2) {
                                        var skipTime = result[vID[1]][i];
                                        if ((result[vID[1]][i + 1] - result[vID[1]][i]) > 1) {
                                                localMid = false;
                                                if (inSkipRange(currentTime, skipTime)) {
                                                        video.currentTime = result[vID[1]][i + 1];
                                                        TotalTimeUpdate(result[vID[1]][i + 1] - currentTime);
                                                }
                                        }
                                }


                                var endpoint = result[vID[1]][result[vID[1]].length - 1];
                                if (endpoint > 0)
                                        localEnd = false;
                                if ((result[vID[1]].length % 2) == 0 && currentTime >= endpoint && endpoint != 0 && Math.floor(currentTime < totalDuration)) {
                                        video.currentTime = Math.ceil(totalDuration);
                                        TotalTimeUpdate(totalDuration - currentTime);
                                }
                        });

                        //local
                        chrome.storage.local.get(vID[1], function(result) {

                                var lstartpoint = result[vID[1]][0];
                                //safety
                                if (currentTime > 0.1 && localStart && lstartpoint > 0 && inSkipRange(currentTime, 0) && lstartpoint > 1) {
                                        TotalTimeUpdate(lstartpoint - currentTime);
                                        video.currentTime = lstartpoint;

                                }

                                if (localMid) {
                                        for (var i = 1; i < result[vID[1]].length - 1; i += 2) {
                                                var skipTime = result[vID[1]][i];
                                                if (inSkipRange(currentTime, skipTime)) {
                                                        video.currentTime = result[vID[1]][i + 1];
                                                        TotalTimeUpdate(result[vID[1]][i + 1] - currentTime);
                                                }
                                        }
                                }

                                var end = result[vID[1]][result[vID[1]].length - 1];
                                if (localEnd && end != 0)
                                        if ((result[vID[1]].length % 2) == 0 && currentTime >= end && Math.floor(currentTime < totalDuration)) {
                                                video.currentTime = Math.ceil(totalDuration);
                                                TotalTimeUpdate(totalDuration - currentTime);
                                        }
                        });


                }
        });

}

function inSkipRange(current_time, skip_time) {
        return (current_time >= skip_time && current_time <= skip_time + 1);
}
