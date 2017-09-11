
var Decompressor = function(){

  var text_array,
    transform_string_array,
    transform_object_array = [],
    shape_string_array,
    shape_object_array = [];
    

  function decompress_big_ass_string(big_ass_string){
    var three_arrays = big_ass_string.split('|');
    shape_string_array = three_arrays[0].split('^');
    shape_string_array.shift();
    transform_string_array = three_arrays[1].split('^');
    transform_string_array.shift();
    text_array = three_arrays[2].split('^');
    text_array.shift();

    for (var i = 0; i < transform_string_array.length; i++){
      transform_object_array[i] = unpack_transform(transform_string_array[i]);
    }

    for (i = 0; i < shape_string_array.length; i++){
      if (shape_string_array[i][0] == 'g'){
        shape_object_array[i] = new Group();
      }else{
        shape_object_array[i] = new Shape(shape_string_array[i][0]);
      }
    }

    shapeBuilder.set_all_shapes(shape_object_array);
    
    for (i = 0; i < shape_object_array.length; i++){
      if (shape_string_array[i][0] == 'g'){
        shape_object_array[i].update_transform_list(unpack_group(shape_string_array[i]));
      }else{
        shape_object_array[i].update_display_stats(unpack_shape(shape_string_array[i]));
      }
      
    }

    for (i = 0; i < shape_object_array.length; i++){
      displayer.add_svg_to_list(shape_object_array[i]);
    }

  };

  function unpack_transform(transform){
    var stats_map = {
      x: 'x',
      y: 'y',
      r: 'rotation',
      s: 'scale',
      o: 'opacity',
      c: 'original_color',
      n: 'new_color'
    };
    var stats = {};
    for (var i = transform.length; i > -1 ; i--){
      if (stats_map.hasOwnProperty(transform[i])){
        stats[stats_map[transform[i]]] = transform.slice(i+1);
        transform = transform.substring(0, i);
      }
    }
    var t = new Transform(transform);
    t.update_transform_stats(stats);
    return t;
  };

  function unpack_shape(shape){
    var stats_map = {
      w: 'width',
      h: 'height',
      T: 'top',
      c: 'color',
      s: 'stroke',
      S: 'stroke_color',
      X: 'text',
      f: 'font_family',
      z: 'font_size'
    };
    var stats = {};
    for (var i = shape.length; i > -1 ; i--){
      if (stats_map.hasOwnProperty(shape[i])){
        stats[stats_map[shape[i]]] = shape.slice(i+1);        
        if (shape[i] == 'X'){
          stats.text = text_array[stats.text];
        }
        shape = shape.substring(0, i);
      }
    }
    return stats;
  };

  function unpack_group(group){
    var t = group.split(',');
    t.shift();
    for (var i = 0; i < t.length; i++){
      t[i] = transform_object_array[t[i]];
    }
    return t;
  }


  this.decompress_big_ass_string = decompress_big_ass_string;
};

var decompressor = new Decompressor();
