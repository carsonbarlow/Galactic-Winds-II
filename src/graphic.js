// indivigual graphic component

var Graphic = function(spec){

  var _this = this;

  this.svg = document.createElement('IMG');
  this.svg.src = DOMURL.createObjectURL(new Blob([svg_graphics_array[spec.svg]], {type: 'image/svg+xml;charset=utf-8'}));
  this.radius = spec.radius;
  this.x = spec.x * spec.scale;
  this.y = spec.y * spec.scale;
  this.rotation = spec.rotation;
  this.scale = spec.scale;


  this.pos_x = 250;
  this.pos_y = 250;

  this.render_x = this.pos_x - this.x;
  this.render_y = this.pos_y - this.y;



  function update_position(cord){
    _this.pos_x = cord.x;
    _this.pos_y = cord.y;

    _this.render_x = _this.pos_x - _this.x;
    _this.render_y = _this.pos_y - _this.y;
  }

  this.update_position = update_position;

};
