window.addEventListener("spfdone", process); // old youtube design
window.addEventListener("yt-navigate-start", process); // new youtube design

document.addEventListener("DOMContentLoaded", process); // one-time early processing
window.addEventListener("load", process); // one-time late postprocessing

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting == "hello")
        {
            var curl=location.href;
            var vID = curl.match(/v\=(.{11})/);
            sendResponse({farewell: vID[1]});

        }
    });



function process() {
    var db = [
        ["weeI1G46q0o", 29],
        ["YQHsXMglC9A", 77],
        ["iGk5fR-t5AU", 65],
        ["kOkQ4T5WO9E", 15],
        ["CTFtOOh47oo", 21],
        ["dPI-mRFEIH0", 23],
        ["DK_0jXPuIr0", 35],
        ["2vjPBrBU-TM", 10],
        ["uxpDa-c-4Mc", 19],
        ["34Na4j8AVgA", 42],
        ["EgqUJOudrcM", 29],
        ["UprcpdwuwCg", 18],
        ["k0BWlvnBmIE", 43],
        ["uuwfgXD8qV8", 29],
        ["aatr_2MstrI", 30],
        ["ij_0p_6qTss", 45],
        ["vWaRiD5ym74", 37],
        ["QtXby3twMmI", 29],
        ["iEPTlhBmwRg", 45],
        ["qpgTC9MDx1o", 40],
        ["09R8_2nJtjg", 26],
        ["GKSRyLdjsPA", 63],
        ["nYh-n7EOtMA", 20],
        ["kJQP7kiw5Fk", 21],
        ["vNoKguSdy4Y", 123],
        ["pRpeEdMmmQ0", 11],
        ["KQ6zr6kCPj8", 84],
        ["SkTt9k4Y-a8", 138],
        ["LjhCEhWiKXk", 15],
        ["Pgmx7z49OEk", 69],
        ["tg00YEETFzg", 51],
        ["lWA2pjMjpBs", 38],
        ["QcIy9NiNbmo", 36],
        ["j3CaHeakZF4", 68],
        ["CduA0TULnow", 37],
        ["C-u5WLJ9Yk4", 16],
        ["rJYcmq__nDM", 33],
        ["nCkpzqqog4k", 41],
        ["pa14VNsdSYM", 15],
        ["-59jGD4WrmE", 36],
        ["Kb24RrHIbFk", 9],
        ["tPZbBBdfr5E", 18],
        ["foE1mO2yM04", 32],
        ["e2vBLd5Egnk", 6],
        ["dT2owtxkU8k", 25],
        ["v-Dur3uXXCQ", 59],
        ["vXyBcKV0UIo", 9],
        ["GTyN-DB_v5M", 14],
        ["tt2k8PGm-TI", 13],
        ["w4s6H4ku6ZY", 6],
        ["GCdwKhTtNNw", 13],
        ["Q15wN8JC2L4", 6],
        ["-CmadmM5cOk", 9],
        ["kzQTc0-iBX8", 35],
        ["t5Sd5c4o9UM", 30]
    ];



    var curl=location.href;
    var vID = curl.match(/v\=(.{11})/);

    var timed = (curl.includes("\&t\=") || curl.includes("\?t\="));
    if(!timed)
     {
        var keep=true;
        for (i = 0; i < db.length && keep; i++) //look in static db
        {
            if (vID[1]==(db[i][0]))
            {
             window.location.replace(location.href+"&t=" + db[i][1]);
              keep = false;
            }


        }

        if(keep){
                 chrome.storage.local.get(vID[1],function(result)
                 {
                    if(!(result[vID[1]]=== undefined || result[vID[1]]==0))
                        window.location.replace(location.href+"&t=" + result[vID[1]]);
                });
            }
}
}



