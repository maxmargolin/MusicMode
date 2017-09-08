window.onload = function(){
document.getElementById('addButton').onclick=function () {
        var ID =document.getElementById("videoID").value;
        var t =document.getElementById("t").value;


        var obj= {};
        obj[ID] = t;

        chrome.storage.local.set(obj);

    };



document.getElementById('getButton').onclick=function () {
          var ID=document.getElementById("videoID").value;
          chrome.storage.local.get(ID,function(result){
          alert(result[ID]);
        });
    };
}
