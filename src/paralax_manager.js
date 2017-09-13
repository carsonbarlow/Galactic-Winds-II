// paralax manager

var ParalaxManager = function(){

  var background = [],
    midground = [],
    foreground = [];

  for (var i = 0; i < 4; i++){
    background.push(new Paralaxer('background', i * 600));
  }

  for (i = 0; i < 8; i++){
    midground.push((new Paralaxer('midground', i * 300)));
  }

  for (i = 0; i < 12; i++){
    midground.push((new Paralaxer('foreground', i * 200)));
  }


  function init(){
    for (var i = 0; i < background.length; i++){
      background[i].init();
    }
    for (i = 0; i < midground.length; i++){
      midground[i].init();
    }
    for (i = 0; i < foreground.length; i++){
      foreground[i].init();
    }
  };

  function update(delta){
    for (var i = 0; i < background.length; i++){
      background[i].update(delta);
    }
    for (i = 0; i < midground.length; i++){
      midground[i].update(delta);
    }
  };


  this.init = init;
  this.update = update;

};