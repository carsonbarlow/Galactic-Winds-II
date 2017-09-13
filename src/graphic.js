// indivigual graphic component

var Graphic = function(spec){

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
    this.pos_x = cord.x;
    this.pos_y = cord.y;

    this.render_x = this.pos_x - this.x;
    this.render_y = this.pos_y - this.y;
  }

  this.update_position = update_position;

};
