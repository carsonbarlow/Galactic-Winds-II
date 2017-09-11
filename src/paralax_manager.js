// paralax manager

var ParalaxManager = function(){

  var background = [],
    midground = [],
    foreground = [];

  for (var i = 0; i < 4; i++){
    background.push(new Paralaxer('background', i * 600));
  }



  function init(){
    for (var i = 0; i < background.length; i++){
      background[i].init();
    }
  };

  function update(delta){
    for (var i = 0; i < background.length; i++){
      background[i].update(delta);
    }
  };





  this.init = init;
  this.update = update;

};