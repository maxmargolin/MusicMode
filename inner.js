setInterval(InSkipper, 500);




function InSkipper() {
        chrome.storage.local.get("on", function(result) {
                if (result["on"]) {
                        let video = document.querySelector("video.html5-main-video");
                        let currentTime = video.currentTime; // Fractional, in seconds
                        let totalDuration = video.duration;
                        var vID = location.href.match(/v\=(.{11})/);


                        chrome.storage.sync.get(vID[1], function(result) {
                                for (var i = 1; i < result[vID[1]].length - 1; i += 2) {
                                        var skipTime = result[vID[1]][i];
                                        if (inSkipRange(currentTime, skipTime)) {
                                                video.currentTime = result[vID[1]][i + 1];
                                                TotalTimeUpdate(result[vID[1]][i + 1] - currentTime);
                                        }
                                }


                                var endpoint = result[vID[1]][result[vID[1]].length - 1];
                                if ((result[vID[1]].length % 2) == 0 && currentTime >= endpoint && endpoint != 0 && Math.floor(currentTime < totalDuration)) {
                                        video.currentTime = Math.ceil(totalDuration);
                                        TotalTimeUpdate(totalDuration - currentTime);
                                }
                        });


                        chrome.storage.local.get(vID[1], function(result) {
                                for (var i = 1; i < result[vID[1]].length - 1; i += 2) {
                                        var skipTime = result[vID[1]][i];
                                        if (inSkipRange(currentTime, skipTime)) {
                                                video.currentTime = result[vID[1]][i + 1];
                                                TotalTimeUpdate(result[vID[1]][i + 1] - currentTime);
                                        }
                                }

                                var end = result[vID[1]][result[vID[1]].length - 1];
                                if (end != 0)
                                        if ((result[vID[1]].length % 2) == 0 && currentTime >= end && Math.floor(currentTime < totalDuration)) {
                                                video.currentTime = Math.ceil(totalDuration);
                                                TotalTimeUpdate(totalDuration - currentTime);
                                        }
                        });


                }
        });

}

function inSkipRange(current_time, skip_time) {
        return (current_time >= skip_time && current_time <= skip_time + 3);
}
