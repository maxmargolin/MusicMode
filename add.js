window.onload = function() {

        document.getElementById("more").addEventListener("click", show);

        function show() {

                if (document.getElementById("expand1").style.display != "block")
                        document.getElementById("expand1").style.display = "block";
                else if (document.getElementById("expand2").style.display != "block") {
                        document.getElementById("expand2").style.display = "block";
                } else {
                        document.getElementById("expand3").style.display = "block";
                        document.getElementById("more").style.display = "none"
                }
        }

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
                                try {
                                        var start = result[currentID][0];
                                        var end = result[currentID][1];

                                        if (start != undefined && start != "0") {
                                                localStart = false;
                                                document.getElementById('start').value = ToTime(start);
                                        }
                                        if (end != undefined && end != "0") {
                                                document.getElementById('end').value = ToTime(end);
                                                localEnd = false;
                                        }
                                } catch (err) {}

                                //  if (localStart || localEnd) {
                                chrome.storage.local.get(currentID, function(sresult) {


                                        if (sresult[currentID] != undefined && sresult[currentID].length > 2) {
                                                var index = 1;
                                                while (index < sresult[currentID].length - 1) {
                                                        var a = document.createElement("input");
                                                        a.setAttribute("type", "text");
                                                        a.setAttribute("placeholder", ToTime(sresult[currentID][index]));
                                                        a.setAttribute("id", "a");
                                                        a.setAttribute("disabled", "true");
                                                        var b = document.createElement("input");
                                                        b.setAttribute("type", "text");
                                                        b.setAttribute("placeholder", ToTime(sresult[currentID][index + 1]));
                                                        b.setAttribute("id", "b");
                                                        b.setAttribute("disabled", "true");
                                                        var element = document.getElementById("extra");
                                                        element.appendChild(a);
                                                        var arrow = document.createElement("i");
                                                        arrow.setAttribute("class", "fa fa-arrow-right");
                                                        arrow.setAttribute("aria-hidden", "true");
                                                        element.appendChild(arrow)
                                                        element.appendChild(b);
                                                        index += 2;
                                                }
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




        chrome.storage.sync.get("totalTime", function(time) {
                if (time["totalTime"] != undefined) {
                        document.getElementById('counter').innerHTML = time["totalTime"];
                        document.getElementById("fb").setAttribute("href", "https://www.facebook.com/sharer/sharer.php?u=bit.ly/skippershare&quote=This%20extension%20already%20saved%20me%20" + time["totalTime"] + "%20seconds!");
                        document.getElementById("tw").setAttribute("href", "https://twitter.com/intent/tweet?text=This%20extension%20already%20saved%20me%20" + time["totalTime"] + "%20seconds!%20http://bit.ly/skippershare");
                        document.getElementById("email").setAttribute("href", "mailto:?Subject=This%20Chrome%20extension%20already%20saved%20me%20" + time["totalTime"] + "%20seconds!&Body='Skipper%20-%20Music%20Mode%20For%20YouTube'%20%20skips%20to%20the%20actual%20song/video%20for%20you,%20You%20should%20Check%20it%20out:%20%20https://chrome.google.com/webstore/detail/skipper-music-mode-for-yo/chojffponkoboggmjpnkflkbcelacijk");
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
                var start = ToSeconds(document.getElementById("start").value);
                var end = ToSeconds(document.getElementById("end").value);

                if (currentID.length != 11)
                ;
                if (isNaN(start))
                        start = 0;
                if (isNaN(end))
                        end = 0;

                var obj = {};
                var arr = [start, end];
                obj[currentID] = arr;

                chrome.storage.sync.set(obj);



                //send
                try {
                        firebase.database().ref(currentID).set({
                                s: start,
                                e: end
                        });
                } catch (err) {}


        };


};
