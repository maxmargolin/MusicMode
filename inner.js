setInterval(alertFunc, 1000);




function alertFunc() {
  let video = document.querySelector("video.html5-main-video");
  let currentTime = video.currentTime; // Fractional, in seconds
  let totalDuration = video.duration;
  //video.currentTime+=100;
  var curl = location.href;
  var vID = curl.match(/v\=(.{11})/);
  if (vID[1] == "pXRviuL6vMY")
    if (currentTime >= 45 && currentTime <= 48)
      video.currentTime = 55;
  if (vID[1] == "tt2k8PGm-TI")
    if (currentTime >= 123 && currentTime <= (123 + 3))
      video.currentTime = 150;
    else if (currentTime >= 326 && currentTime < Math.floor(totalDuration))
    video.currentTime = Math.ceil(totalDuration);
  if (vID[1] == "-59jGD4WrmE")
    if (currentTime >= 278 && currentTime < Math.floor(totalDuration))
      video.currentTime = Math.ceil(totalDuration);
  if (vID[1] == "GKSRyLdjsPA")
    if (currentTime >= 272 && currentTime < Math.floor(totalDuration))
      video.currentTime = Math.ceil(totalDuration);

  if (vID[1] == "gBRi6aZJGj4")
    if (currentTime >= 180 && currentTime < Math.floor(totalDuration))
      video.currentTime = Math.ceil(totalDuration);

}
