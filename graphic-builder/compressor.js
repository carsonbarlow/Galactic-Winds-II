
var Compressor = function(){

  var big_ass_string;
  var text_array = [];
  var transform_array = [];

  function make_big_ass_string(){
    big_ass_string = '';
    text_array = [];
    transform_array = [];
    // aggrigate all shapes
    var shapes = shapeBuilder.get_all_shapes();
    for (var i = 0; i < shapes.length; i++){
      big_ass_string += '^'+compress_shape(shapes[i]);
    }
    big_ass_string += '|';
    // aggrigate all transforms
    for (i = 0; i < transform_array.length; i++){
      big_ass_string += '^'+compress_transform(transform_array[i]);
    }
    big_ass_string += '|';
    // aggrigate all strings
    for (i = 0; i < text_array.length; i++){
      big_ass_string += '^'+text_array[i];
    }

    data_transfer.save(big_ass_string);
  };

  function compress_shape(shape){
    var shape_map = {
      e: compress_elips,
      r: compress_rectangle,
      t: compress_triange,
      x: compress_text,
      g: compress_group
    };

    return shape_map[shape.stats.type](shape.stats);
  };

  function compress_elips(stats){
    var return_val = stats.type;
    return_val +='c'+stats.color;
    return_val += 'h'+stats.height;
    return_val += 'w'+stats.width;
    return_val += (stats.stroke)? 'S'+stats.stroke_color+'s'+stats.stroke : '';
    return return_val;
  };

  function compress_rectangle(stats){
    return compress_elips(stats);
  };

  function compress_triange(stats){
    var return_val = compress_elips(stats);
    return_val += 'T'+stats.top;
    return return_val;
  };

  function compress_text(stats){
    var return_val = stats.type;
    return_val +='c'+stats.color;
    return_val += (stats.stroke)? 'S'+stats.stroke_color+'s'+stats.stroke : '';
    return_val += 'z'+stats.font_size;
    return_val += 'f'+stats.font_family;
    return_val += 'X'+catalog_text(stats.text);
    return return_val;
  };

  function compress_group(stats){
    var transforms = stats.transforms;
    var return_text = 'g';
    for (var i = 0; i < transforms.length; i++){
      var transform_index = catalog_transform(transforms[i]);
      return_text += ',' + transform_index;
    }
    return return_text;
  };


  function catalog_text(text){
    for (var i = 0; i < text_array.length; i++){
      if (text_array[i] == text){
        return i;
      }
    }
    text_array.push(text);
    return text_array.length - 1;
  };

  function catalog_transform(transform){
    for (var i = 0; i < transform_array.length; i++){
      if (UTILS.compare_objects(transform.stats, transform_array[i])){
        return i;
      }
    }
    transform_array.push(transform.stats);
    return transform_array.length - 1;
  };

  function compress_transform(transform){
    var return_val = transform.shape_index;
    return_val +='x'+transform.x;
    return_val += 'y'+transform.y;
    return_val += (transform.rotation)? 'r'+transform.rotation : '';
    return_val += (transform.scale != 1)? 's'+transform.scale : '';
    return_val += (transform.opacity != 1)? 'o'+transform.opacity : '';
    return_val += (transform.original_color)? 'c'+transform.original_color+'n'+transform.new_color : '';
    return return_val;
  };

  this.make_big_ass_string = make_big_ass_string;
};


compressor = new Compressor();