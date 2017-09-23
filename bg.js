
 chrome.storage.local.get("version",function(result)
    {
        currentDBVersion = 5 ; //change to force update
        if(!(result["version"]===currentDBVersion)) {
            var db = [
                ["version", currentDBVersion], // mark version in storage
                ["on",true],
                //Video id and start point
                  ["weeI1G46q0o", 29],["YQHsXMglC9A", 77],  ["3RSlhNJFohI", 28],  ["iGk5fR-t5AU", 65],["kOkQ4T5WO9E", 15],["jQd5OEl1W-Q", 18],  ["EgT_us6AsDg", 19],  ["CTFtOOh47oo", 21],
                  ["dPI-mRFEIH0", 23],
                  ["d7ypnPjz81I", 29],
                  ["DK_0jXPuIr0", 35],
                  ["2vjPBrBU-TM", 10],
                  ["uxpDa-c-4Mc", 19],
                  ["0mVck88W01I", 9],
                  ["Lh2oWbaRvQg",10],
                  ["34Na4j8AVgA", 42],
                  ["co4YpHTqmfQ",9],
                  ["yNPECkESPbU",33],
                  ["_sXrTpOVnak",72],
                  ["EgqUJOudrcM", 29],
                  ["UprcpdwuwCg", 18],
                  ["niqrrmev4mA",133],
                  ["97xnWVZYq_Q",13],
                  ["k0BWlvnBmIE", 43],
                  ["uuwfgXD8qV8", 29],
                  ["ANS9sSJA9Yc", 32],
                  ["fyaI4-5849w", 8],
                  ["ocDlOD1Hw9k", 17],
                  ["-MsvER1dpjM", 7],
                  ["k2qgadSvNyU", 9],
				          ["cedoBlUvBlI", 8],
                  ["E1mU6h4Xdxc",22],
                  ["0AqnCSdkjQ0",20],
          				["17ozSeGw-fY",53],
          				["i1Jp-V4jalI",8],
          				["rQ7tMWOCQlM",8],
          				["gl2p4G3CUrI",8],
          				["y3OzHBEcymw",5],
          				["YnwfTHpnGLY",4],
          				["gCYcHz2k5x0",4],
          				["9vMh9f41pqE",4],
                  ["HcXNPI-IPPM",138],
          				["KnL2RJZTdA4",4],
          				["5dbEhBKGOtY",20],
          				["dzHdo4yxidc",4],
          				["CFF0mV24WCY",5],
                  ["5KNEZJ6KkLI",18],
                  ["rp4UwPZfRis", 52],
                  ["bbEoRnaOIbs", 51],
                  ["2GADx4Hy-Gg", 10],
                  ["AMTAQ-AJS4Y",50],
                  ["-UV0QGLmYys", 7],
                  ["AqajUg85Ax4",38],
                  ["KJBHdKBOdcw",11],
                  ["ZRDmJ6v_Zgs",45],
                  ["0BiS-AT5v3k",45],
                  ["MKpCDz0UjW4",41],
                  ["wwCykGDEp7M", 26],
                  ["W-TE_Ys4iwM", 4],
                  ["NOBVEq_Bi5k", 5],
                  ["CdXesX6mYUE",10],
                  ["aatr_2MstrI", 30],
                  ["Oe4Ic7fHWf8",41],
                  ["3gOHvDP_vCs", 17],
                  ["XNtTEibFvlQ", 33],
                  ["ij_0p_6qTss", 45],
                  ["_kqQDCxRCzM",4],
                  ["L_jWHffIx5E",36],
                  ["PWgvGjAhvIw",68],
                  ["vWaRiD5ym74", 37],
                  ["VA770wpLX-Q",164],
                  ["3tmd-ClpJxA", 5],
                  ["qMxX-QOV9tI", 18],
                  ["kTHNpusq654",32],
                  ["Ys7-6_t7OEQ", 34],
                  ["clSv4TzbRCs", 61],
                  ["uuNTO31FlY8",35],
                  ["1y6smkh6c-0", 6],
                  ["p4kVWCSzfK4", 15],
                  ["QtXby3twMmI", 29],
                  ["RQa7SvVCdZk", 7],
                  ["QxsmWxxouIM", 60],
                  ["nJ3ZM8FDBlg", 10],
                  ["WDAd0S92Uko", 18],
                  ["MMAppa1cAVo", 12],
                  ["5NPBIwQyPWE", 7],
                  ["PVzljDmoPVs", 8],
                  ["KkGVmN68ByU", 23],
                  ["sY3rIlrTTh8", 12],
                  ["n-D1EB74Ckg", 38],
                  ["9h30Bx4Klxg", 15],
                  ["TUj0otkJEBo", 21],
                  ["BPgEgaPk62M", 44],
                  ["5XR7naZ_zZA", 37],
                  ["ClU3fctbGls", 41],
                  ["iEPTlhBmwRg", 45],
                  ["ShlW5plD_40", 16],
                  ["H202k7KfZL0", 27],
                  ["mytLRy32Viw", 17],
                  ["bMpFmHSgC4Q", 9],
                  ["ebXbLfLACGM", 12],
                  ["VbfpW0pbvaU", 22],
                  ["KWZGAExj-es", 6],
                  ["YykjpeuMNEk", 16],
                  ["6ACl8s_tBzE", 40],
                  ["cMTAUr3Nm6I", 10],
                  ["NmugSMBh_iI", 8],
                  ["ULoXlXJOZOo", 28],
                  ["UWLr2va3hu0", 21],
                  ["KRaWnd3LJfs", 39],
                  ["qpgTC9MDx1o", 40],
                  ["09R8_2nJtjg", 26],
                  ["igNVdlXhKcI", 8],
                  ["GKSRyLdjsPA", 63],
                  ["nYh-n7EOtMA", 20],
                  ["fKopy74weus", 22],
                  ["kJQP7kiw5Fk", 21],
                  ["u3u22OYqFGo",102],
                  ["vNoKguSdy4Y", 123],
                  ["pRpeEdMmmQ0", 11],
                  ["KQ6zr6kCPj8", 84],
                  ["SkTt9k4Y-a8", 138],
                  ["LjhCEhWiKXk", 15],
                  ["WUcXQ--yGWQ", 17],
                  ["Pgmx7z49OEk", 69],
                  ["tg00YEETFzg", 51],
                  ["lWA2pjMjpBs", 38],
                  ["QcIy9NiNbmo", 36],
                  ["j3CaHeakZF4", 68],
                  ["CduA0TULnow", 37],
                  ["C-u5WLJ9Yk4", 16],
          				["jGflUbPQfW8", 8],
                  ["rJYcmq__nDM", 33],
                  ["nCkpzqqog4k", 41],
                  ["pa14VNsdSYM", 15],
                  ["-59jGD4WrmE", 36],
                  ["uEJuoEs1UxY", 8],
                  ["Kb24RrHIbFk", 9],
                  ["tPZbBBdfr5E", 18],
                  ["foE1mO2yM04", 32],
                  ["e2vBLd5Egnk", 6],
                  ["dT2owtxkU8k", 25],
                  ["v-Dur3uXXCQ", 59],
                  ["vXyBcKV0UIo", 9],
                  ["wfN4PVaOU5Q", 6],
                  ["GTyN-DB_v5M", 14],
                  ["tt2k8PGm-TI", 13],
                  ["w4s6H4ku6ZY", 6],
                  ["NU9JoFKlaZ0", 103],  ["mdB3Oyd5HtU", 15],  ["SeIJmciN8mo",40],
                  ["X0DeIqJm4vM", 15],  ["vx2u5uUu3DE", 20],  ["eP4eqhWc7sI",33],["GQ95z6ywcBY", 167],["R7yfISlGLNU", 25],  ["qV5lzRHrGeg",2],  ["TdrL3QxjyVw",17],  ["xdYFuCp3m9k",0],  ["nIjVuRTm-dc", 11],
                  ["4wTLjEqj5Xk", 8],  ["XleOkGsYgO8",4],["wagn8Wrmzuc",34],  ["GCdwKhTtNNw", 13],["vdrqA93sW-8", 22],  ["GI6CfKcMhjY", 23],  ["tKi9Z-f6qX4", 3],  ["-LX2kpeyp80", 8],
                  ["Q15wN8JC2L4", 6],  ["d2smz_1L2_0", 148],  ["F4ELqraXx-U",8],  ["dvf--10EYXw",3],["jhC1pI76Rqo",17],  ["wtC744jVWmE",15],  ["Gd9OhYroLN0",8],
                  ["ScNNfyq3d_w",58],["-CmadmM5cOk", 9],["kzQTc0-iBX8", 35],["t5Sd5c4o9UM", 30],["413KGp9VDkY", 47],  ["-Ju62LXCdmM", 27],["CW5oGRx9CLM", 9],
            ];




            for (var i = 0; i < db.length; i++) {
                var obj = {};
                obj[db[i][0]] = db[i][1];

                chrome.storage.local.set(obj);
            }


        }
    });




            chrome.storage.sync.get("totalTime", function (time) {
                if (time["totalTime"]==undefined){
                    var obj = {};
                    obj["totalTime"] =  0 ;
                    chrome.storage.sync.set(obj);
                  }
            });



//cach the change
    window.addEventListener("spfdone", process); // old youtube design
    window.addEventListener("yt-navigate-start", process); // new youtube design

    document.addEventListener("DOMContentLoaded", process); // one-time early processing
    window.addEventListener("load", process); // one-time late postprocessing



    //popup is requesting id
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.greeting == "hello")
            {
                var curl=location.href;
                var vID = curl.match(/v\=(.{11})/);
                sendResponse({farewell: vID[1]});

            }
        });


//skip part of video
function process() {



    var curl = location.href; //current url
    var vID = curl.match(/v\=(.{11})/); //regex for ID

    var timed = (curl.includes("\&t\=") || curl.includes("\?t\="));
    if (!timed) {  //only if video is not timed


            chrome.storage.local.get("on",function(result){
                if(result["on"])
                { //sync storage beforelocal
                  chrome.storage.sync.get(vID[1], function (result) {
                      if (!(result[vID[1]] === undefined || result[vID[1]] == 0)){
                          window.location.replace(location.href + "&t=" + result[vID[1]]);   //change url

                          chrome.storage.sync.get("totalTime", function (time) {
                            var newTime = {};
                            newTime["totalTime"] =  time["totalTime"] + result[vID[1]] ;
                            chrome.storage.sync.set(newTime);
                          });
                        }
                      else {
                        chrome.storage.local.get(vID[1], function (result) {
                            if (!(result[vID[1]] === undefined || result[vID[1]] == 0))
                            {
                                window.location.replace(location.href + "&t=" + result[vID[1]]);   //change url


                                chrome.storage.sync.get("totalTime", function (time) {
                                  var newTime = {};
                                  newTime["totalTime"] =  time["totalTime"] + result[vID[1]];
                                  chrome.storage.sync.set(newTime);
                                });

                            }
                        });
                      }
                  });


                }

        });





    }
}
