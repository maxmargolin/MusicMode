setInterval(alertFunc, 1000);




function alertFunc() {
  let video = document.querySelector("video.html5-main-video");
  let currentTime = video.currentTime; // Fractional, in seconds
  let totalDuration = video.duration;
  //video.currentTime+=100;
  var curl = location.href;
  var vID = curl.match(/v\=(.{11})/);


      chrome.storage.local.get(vID[1], function(result) {
        for (var i = 1; i < result[vID[1]].length-1; i+=2) {
          if (currentTime >= result[vID[1]][i] && currentTime <= (result[vID[1]][i] + 3))
            video.currentTime = result[vID[1]][i+1];
          }
        if ((result[vID[1]].length%2)==0 && currentTime >= result[vID[1]][result[vID[1]].length-1] && Math.floor(currentTime<totalDuration))
          video.currentTime = Math.ceil(totalDuration);
      });


}
