window.onload = function() {



        var currentID = "x";

        chrome.tabs.query({
                active: true,
                currentWindow: true
        }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                        greeting: "hello"
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

                                if (localStart || localEnd) {
                                        chrome.storage.local.get(currentID, function(sresult) {


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
                                }
                        });
                });
        });

        document.getElementById('setButton').onclick = function() {
                var start = ToSeconds(document.getElementById("start").value);
                var end = ToSeconds(document.getElementById("end").value);

                if (currentID.length != 11)
                        alert("");
                if (isNaN(start))
                        start = "0";
                if (isNaN(end))
                        end = "0";

                var obj = {};
                var arr = [start, end];
                obj[currentID] = arr;

                chrome.storage.sync.set(obj);
        };


        chrome.storage.sync.get("totalTime", function(time) {
                if (time["totalTime"] != undefined)
                        document.getElementById('counter').innerHTML = time["totalTime"];
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
};
