
var dataTransfer = function(){

  function save(text){
    var http = new XMLHttpRequest();
    var url = "/save";
    var params = "lorem=ipsum&name=binny";
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
        }
    }
    http.send(JSON.stringify({content: text}));
  };

  function load(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        decompressor.decompress_big_ass_string(xmlHttp.responseText);
      }
    }
    xmlHttp.open("GET", "/load", true);
    xmlHttp.send(null);
  };


  this.save = save;
  this.load = load;

};

data_transfer = new dataTransfer();
