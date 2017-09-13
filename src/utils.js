// utils

var Utils = function(){

  function check_if_off_screen(graphic){
    if (graphic.pos_x < -graphic.radius || graphic.pos_x > CANVAS_WIDTH + graphic.radius || graphic.pos_y < -graphic.radius || graphic.pos_y > CANVAS_HEIGHT + graphic.radius){
      return true;
    }
    return false;
  };

  function check_if_in_bounds(graphic){
    var return_array = [];
    if (graphic.pos_x < 100 - (graphic.radius)){
      return_array.push('left');
    }else if (graphic.pos_x > CANVAS_WIDTH - 50 - (graphic.radius)){
      return_array.push('right');
    }
    if (graphic.pos_y < 150 - (graphic.radius)){
      return_array.push('top');
    }else if (graphic.pos_y > CANVAS_HEIGHT - 50 - (graphic.radius)){
      return_array.push('bottom');
    }
    return return_array;
  };

  function normalize(from_x, from_y, to_x, to_y){
    var  x_dif = to_x - from_x;
    var y_dif = to_y - from_y;
    var hyp = (x_dif*x_dif)+(y_dif*y_dif);
    hyp = Math.sqrt(hyp);
    return [(x_dif/hyp),(y_dif/hyp)];
  };

  function proximity(obj_1_x, obj_1_y, obj_2_x, obj_2_y){
    var x_dif = obj_2_x - obj_1_x;
    var y_dif = obj_2_y - obj_1_y;
    return Math.sqrt((x_dif*x_dif)+(y_dif*y_dif));
  };

  function collision(g1, g2){
    return (proximity(g1.pos_x, g1.pos_y, g2.pos_x, g2.pos_y) < (g1.radius + g2.radius));
  };

  this.check_if_off_screen = check_if_off_screen;
  this.check_if_in_bounds = check_if_in_bounds;
  this.normalize = normalize;
  this.proximity = proximity;
  this.collision = collision;
};
