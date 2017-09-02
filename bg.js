window.addEventListener("spfdone", process); // old youtube design
window.addEventListener("yt-navigate-start", process); // new youtube design

document.addEventListener("DOMContentLoaded", process); // one-time early processing
window.addEventListener("load", Process); // one-time late postprocessing




function process() {
    var db = [
        ["weeI1G46q0o", 29],
        ["YQHsXMglC9A", 77],
        ["iGk5fR-t5AU", 65],
        ["kOkQ4T5WO9E", 15],
        ["CTFtOOh47oo", 21],
        ["dPI-mRFEIH0", 23],
        ["DK_0jXPuIr0", 35],//
        ["2vjPBrBU-TM", 10],
        ["uxpDa-c-4Mc", 19],
        ["34Na4j8AVgA", 42],
        ["EgqUJOudrcM", 29],
        ["UprcpdwuwCg", 18],
        ["k0BWlvnBmIE", 43],
        ["uuwfgXD8qV8", s9]
    ];



    var curl=location.href;
    var timed = (curl.includes("\&t\=") || curl.includes("\?t\="));
    if(!timed) {
        var keep=true;
        for (i = 0; i < db.length && keep; i++){
        if (curl.includes("v\="+db[i][0])) {
            location.href += "&t=" + db[i][1];
            keep = false;
        }
}

}
}


