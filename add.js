window.onload = function() {
  chrome.storage.sync.get("totalTime", function(time) {
    if (time["totalTime"] != undefined)
      document.getElementById('counter').innerHTML = time["totalTime"];
  });

  chrome.storage.local.get("on", function(result) {
    document.getElementById("slideThree").checked = result["on"];
  });



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



  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      greeting: "hello"
    }, function(response) { //ask for information for this page
      var currentID = response.farewell;
      document.getElementById('videoID').value = currentID;

      // sync storage before local
      chrome.storage.sync.get(currentID, function(result) {
        var existingTimestamp = result[currentID];
        document.getElementById('t').value = existingTimestamp;
        if (existingTimestamp == undefined) {
          chrome.storage.local.get(currentID, function(sresult) {
            existingTimestamp = sresult[currentID];
            if (existingTimestamp == undefined)
              existingTimestamp = 0;
            document.getElementById('t').value = existingTimestamp;
          });
        }

      });
    });
  });


  document.getElementById('setButton').onclick = function() {
    var ID = document.getElementById("videoID").value;
    var t = document.getElementById("t").value;

    if (ID.length != 11)
      alert("video ID must be 11 characters");
    else if (isNaN(t))
      alert("Number of seconds to skip must be a positive number");
    else {
      var obj = {};
      obj[ID] = t;

      chrome.storage.sync.set(obj);
    }


  };





};
