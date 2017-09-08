window.onload = function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
            var currentID = response.farewell;
            document.getElementById('videoID').value = currentID;

            chrome.storage.local.get(currentID,function(result){
               existingTimestamp = result[currentID];
               if(existingTimestamp == undefined)
                   existingTimestamp = 0;
                document.getElementById('t').innerHTML = existingTimestamp;
            });
        });
    });


document.getElementById('setButton').onclick=function () {
        var ID =document.getElementById("videoID").value;
        var t =document.getElementById("t").value;

        var obj= {};
        obj[ID] = t;

        chrome.storage.local.set(obj);

    };
};

