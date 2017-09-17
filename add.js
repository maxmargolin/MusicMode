window.onload = function(){


    chrome.storage.local.get("on",function(result){
        document.getElementById("slideThree").checked = result["on"];
           });



    var checkbox = document.querySelector("input[name=check]");

checkbox.addEventListener( 'change', function() {
        var obj = {};
    if(this.checked) {
        
        obj["on"] = true;
        chrome.storage.local.set(obj);
    } else {
       obj["on"] = false;
        chrome.storage.local.set(obj);
    }
});



    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) { //ask for information for this page
            var currentID = response.farewell;
            document.getElementById('videoID').value = currentID;

            chrome.storage.local.get(currentID,function(result){
               existingTimestamp = result[currentID];
               if(existingTimestamp == undefined)
                   existingTimestamp = 0;
                document.getElementById('t').value = existingTimestamp;
            });
        });
    });


document.getElementById('setButton').onclick=function () {
    var ID = document.getElementById("videoID").value;
    var t = document.getElementById("t").value;

    if (t != "0")
    {
        var obj = {};
        obj[ID] = t;

        chrome.storage.local.set(obj);
    }


    };



};

