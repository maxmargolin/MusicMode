setInterval(InSkipper, 1000);




function InSkipper() {
        chrome.storage.local.get("on", function(result) {
                if (result["on"]) {
                        let video = document.querySelector("video.html5-main-video");
                        let currentTime = video.currentTime; // Fractional, in seconds
                        let totalDuration = video.duration;
                        //video.currentTime+=100;
                        var curl = location.href;
                        var vID = curl.match(/v\=(.{11})/);


                        chrome.storage.local.get(vID[1], function(result) {
                                for (var i = 1; i < result[vID[1]].length - 1; i += 2) {
                                        var skipTime = result[vID[1]][i];
                                        if (inSkipRange(currentTime, skipTime)) {
                                                video.currentTime = result[vID[1]][i + 1];
                                                TotalTimeUpdate(result[vID[1]][i + 1] - currentTime);
                                        }
                                }

                                if ((result[vID[1]].length % 2) == 0 && currentTime >= result[vID[1]][result[vID[1]].length - 1] && Math.floor(currentTime < totalDuration)) {
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
