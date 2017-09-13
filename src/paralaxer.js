// object that paralaxes

var Paralaxer = function(_type_, _pos_x_){

  var type = _type_,
    pos_x = _pos_x_,
    pos_y;
  var level = 0;
  var svg_key = {
    background: [
      CONFIG_BACKGROUND_LEVEL_1_TERRAIN
    ],
    midground: [
      CONFIG_MIDGROUND_LEVEL_1_TERRAIN
    ],
    foreground: [
      CONFIG_FOREGROUND_LEVEL_1_TERRAIN
    ]
  };
  var SPEEDS = {
    background: 20,
    midground: 60,
    foreground: 120
  };

  var SCALES = {
    background: 6,
    midground: 3,
    foreground: 2
  };

  var POS_YS = {
    background: (720/2) + 20,
    midground: 720 - 190,
    foreground: 720 - 100
  };


  var graphic;

  function init(){
    pos_y = POS_YS[type];
    var random_terrian = parseInt(Math.random() * svg_key[type][level].length);
    graphic = new Graphic({
      svg: svg_key[type][level][random_terrian],
      radius: 0,
      x: 50,
      y: 50,
      rotation: 0,
      scale: SCALES[type] + 0.1
    });
    graphics.add_to_manifest(graphic, type);
  };

  function update(delta){
    pos_x -= (SPEEDS[type] * delta);
    if (pos_x < -(SCALES[type] * 50)){
      pos_x += 2400;
    }
    graphic.update_position({x: pos_x, y: pos_y});
  };


  this.init = init;
  this.update = update;

};
