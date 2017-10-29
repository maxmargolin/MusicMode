window.onload = function() {
        var start = 0;
        var end = 0;


        var currentID = "x";
        chrome.tabs.query({
                active: true,
                currentWindow: true
        }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                        req: "id"
                }, function(response) { //ask for information for this page
                        try {
                                currentID = response.farewell;
                        } catch (err) {}
                        if (currentID.length !== 11) {
                                document.getElementById('start').style.display = "none";
                                document.getElementById('end').style.display = "none";
                                document.getElementById('setButton').style.display = "none";
                                document.getElementById('icon1').style.display = "none";
                                document.getElementById('icon2').style.display = "none";
                                document.getElementById('sethr').style.display = "none";
                        }


                        // sync storage before local
                        chrome.storage.sync.get(currentID, function(result) {
                                var localEnd = true;
                                var localStart = true;
                                var localInner = true;
                                try {
                                        start = result[currentID][0];
                                        end = result[currentID][result[currentID].length - 1];

                                        if (start != undefined && start != "0") {
                                                localStart = false;
                                                document.getElementById('start').value = ToTime(start);
                                        }
                                        localInner = !(ShowInnerSkips(result[currentID]));
                                        if (end != undefined && end != "0") {
                                                document.getElementById('end').value = ToTime(end);
                                                localEnd = false;
                                        }
                                } catch (err) {}

                                //  if (localStart || localEnd) {
                                chrome.storage.local.get(currentID, function(sresult) {


                                        if (localInner && sresult[currentID] != undefined && sresult[currentID].length > 2) {
                                                ShowInnerSkips(sresult[currentID]);
                                        }

                                        if (localStart) {
                                                try {
                                                        var start = sresult[currentID][0];
                                                        if (start != undefined && start != 0)
                                                                document.getElementById('start').value = ToTime(String(start));
                                                } catch (err) {}
                                        }
                                        if (localEnd) {
                                                try {
                                                        if ((sresult[currentID].length - 1) % 2 == 1)
                                                                document.getElementById('end').value = ToTime(String(sresult[currentID][sresult[currentID].length - 1]));
                                                } catch (err) {}
                                        }
                                });
                                //  }
                        });
                });
        });



        function ShowInnerSkips(times) {
                var index = 1;
                var syncSkiperFound = false;
                while (index < times.length - 1) {
                    //    if (times[index] != 0 && times[index + 1] != 0) {
                                syncSkiperFound = true;
                                var a = document.createElement("input");
                                a.setAttribute("type", "text");
                                //a.setAttribute("placeholder", ToTime(times[index]));
                                a.value = ToTime(times[index]);
                                a.setAttribute("id", String.fromCharCode(96 + index));
                                //    a.setAttribute("disabled", "true");
                                var b = document.createElement("input");
                                b.setAttribute("type", "text");
                                b.value = ToTime(times[index + 1]);
                                b.setAttribute("id", String.fromCharCode(97 + index));
                                //  b.setAttribute("disabled", "true");
                                var element = document.getElementById("extra");
                                element.appendChild(a);
                                var arrow = document.createElement("i");
                                arrow.setAttribute("class", "fa fa-arrow-right");
                                arrow.setAttribute("aria-hidden", "true");
                                element.appendChild(arrow)
                                element.appendChild(b);
                      //  }
                        index += 2;
                }
                return syncSkiperFound;
        }



        var tt = "0";
        document.getElementById("more").addEventListener("click", show);

        function show() {

                if (document.getElementById("expand2").style.display != "block") {
                        document.getElementById("expand2").style.display = "block";
                } else {
                        document.getElementById("expand3").style.display = "block";
                        document.getElementById("more").style.display = "none"
                }
        }

        chrome.storage.sync.get("totalTime", function(time) {
                if (time["totalTime"] != undefined) {
                        tt = time["totalTime"];
                        document.getElementById('counter').innerHTML = tt;
                        document.getElementById("fb").setAttribute("href", "https://www.facebook.com/sharer/sharer.php?u=bit.ly/skippershare&quote=This%20extension%20already%20saved%20me%20" + tt + "%20seconds!");
                        document.getElementById("tw").setAttribute("href", "https://twitter.com/intent/tweet?text=This%20extension%20already%20saved%20me%20" + tt + "%20seconds!%20http://bit.ly/skippershare");
                        document.getElementById("email").setAttribute("href", "mailto:?Subject=This%20Chrome%20extension%20already%20saved%20me%20" + tt + "%20seconds!&Body='Skipper%20-%20Music%20Mode%20For%20YouTube'%20%20skips%20to%20the%20actual%20song/video%20for%20you,%20You%20should%20Check%20it%20out:%20%20https://chrome.google.com/webstore/detail/skipper-music-mode-for-yo/chojffponkoboggmjpnkflkbcelacijk");
                        if (tt > 0)
                                document.getElementById("rate").style.display = "block";
                }
        });


        chrome.storage.local.get("on", function(result) {
                document.getElementById("slideThree").checked = result["on"];
        });

        function ToTime(seconds) {
                if (seconds == "" || seconds == undefined)
                        return 0;
                if (parseInt(seconds) < 3600)
                        return parseInt(Math.floor(seconds / 60)) + ":" + parseInt((seconds % 60) / 10) + parseInt(seconds % 10);
                else
                        return parseInt(Math.floor(seconds / 3600)) + ":" + Math.floor((seconds % 3600) / 60) + ":" + parseInt(seconds % 60);

        }

        function ToSeconds(str) {
                var p = str.split(':'),
                        s = 0,
                        m = 1;

                while (p.length > 0) {
                        s += m * parseInt(p.pop(), 10);
                        m *= 60;
                }
                return s;
        }

        var checkbox = document.querySelector("input[name=check]");
        checkbox.addEventListener('change', function() {
                var obj = {};
                if (this.checked) {
                        obj["on"] = true;
                        chrome.storage.local.set(obj);
                } else {
                        obj["on"] = false;
                        chrome.storage.local.set(obj);
                }
        });






        //save button
        (function() {
                var removeSuccess;

                removeSuccess = function() {
                        return $('.button').removeClass('success');
                };

                $(document).ready(function() {
                        return $('.button').click(function() {
                                $(this).addClass('success');
                                return setTimeout(removeSuccess, 1000);
                        });
                });

        }).call(this);




        //where to send
        try {
                var config = {
                        apiKey: "AIzaSyCwUoS6G3piAXhtrs9Cp1TzVfIPxeOg9vI",
                        authDomain: "skipper-63ddb.firebaseapp.com",
                        databaseURL: "https://skipper-63ddb.firebaseio.com",
                        projectId: "skipper-63ddb",
                        storageBucket: "skipper-63ddb.appspot.com",
                        messagingSenderId: "13095823735"
                };
                //get ready
                firebase.initializeApp(config);
        } catch (err) {}

        document.getElementById('setButton').onclick = function() {
                var newStart = ToSeconds(document.getElementById("start").value);
                var newEnd = ToSeconds(document.getElementById("end").value);
                var pointA = 0;
                var pointB = 0;
                var pointC = 0;
                var pointD = 0;
                try {
                        pointA = ToSeconds(document.getElementById("a").value);
                        pointB = ToSeconds(document.getElementById("b").value);
                        pointC = ToSeconds(document.getElementById("c").value);
                        pointD = ToSeconds(document.getElementById("d").value);
                } catch (err) {}

                if (currentID.length != 11)
                ;
                if (isNaN(newStart))
                        newStart = 0;
                if (isNaN(newEnd))
                        newEnd = 0;

                var obj = {};
                var arr = [newStart, pointA, pointB, pointC, pointD, newEnd];
                obj[currentID] = arr;
                alert("pushed" + arr);

                chrome.storage.sync.set(obj);



                //stats
                var saves = 0;
                var rates = 0;
                chrome.storage.sync.get("SaveCount", function(result) {
                        saves = result["SaveCount"] + 1;
                        var toPush = {};
                        toPush["SaveCount"] = saves;
                        chrome.storage.sync.set(toPush);


                });
                chrome.storage.sync.get("RateCount", function(result) {
                        rates = result["RateCount"];
                        //send
                        if ((newStart != 0 || newEnd != 0) && (newStart !== start || newEnd !== end))
                                try {
                                        firebase.database().ref(currentID).set({
                                                times: arr,
                                                sCount: saves,
                                                rCount: rates,
                                                userTT: tt
                                        });
                                } catch (err) {}
                });



        };

        document.getElementById('rate').onclick = function() {
                chrome.storage.sync.get("RateCount", function(result) {
                        var rated = result["RateCount"] + 1;
                        var toPush = {};
                        toPush["RateCount"] = rated;
                        chrome.storage.sync.set(toPush);


                });
        };


};
