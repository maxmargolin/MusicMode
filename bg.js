window.addEventListener("spfdone", process); // old youtube design
window.addEventListener("yt-navigate-start", process); // new youtube design

document.addEventListener("DOMContentLoaded", process); // one-time early processing
window.addEventListener("load", Process); // one-time late postprocessing



function process() {
// this is the code which will be injected into a given page...

var curl=location.href;
var timed = (curl.includes("\&t\=") || curl.includes("\?t\="));
if(!timed) {
    if (curl.includes("weeI1G46q0o"))
    {
        location.href += "&t=29";

}
    //if(location.href=="https://www.youtube.com/watch?v=weeI1G46q0o")

    //  else if(location.href=="https://www.youtube.com/watch?v=YQHsXMglC9A")
    //        location.href="https://youtu.be/YQHsXMglC9A?t=1m17s";
}
}


