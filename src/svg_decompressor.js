// svg decomressor

var SVGDecompresor = function(){

  var text_array,
    transform_string_array,
    transform_object_array = [],
    shape_string_array,
    shape_object_array = [];
    

  function decompress_big_ass_string(){
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

    for (i = 0; i < shape_object_array.length; i++){
      if (shape_string_array[i][0] == 'g'){
        shape_object_array[i].update_transform_list(unpack_group(shape_string_array[i]));
      }else{
        shape_object_array[i].update_display_stats(unpack_shape(shape_string_array[i]));
      }
    }
    
    for (i = 0; i < shape_object_array.length; i++){
      // console.log( shape_object_array[i] );
      svg_graphics_array[i] = build_svg(shape_object_array[i]);
      // console.log( svg_graphics_array[i] );
    }
  };

  function build_svg(shape){
    return wrap_into_svg(shape.build_svg());
  };


  function wrap_into_svg(svg){
    return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 50 50" xml:space="preserve">'+svg+'</svg>';
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

  function get_shape(index){
    return shape_object_array[index];
  };


  this.decompress_big_ass_string = decompress_big_ass_string;
  this.get_shape = get_shape;
};

var svg_graphics_array = [];
var big_ass_string = '^rcDDDh5w8SD22s0.5^tcDDDh5w5SD00s0.5T47^g,0,1,2^ec00Dh2w4^tcFFFh-10w10T50^tcFFFh10w10T50^g,3,4^rc225h100w100^g,5,6,7,8^tc784h20w25SE8Es0.8T50^tc784h15w10SE8Es0.8T50^tc784h10w40SE8Es0.8T50|^0x0y0^1x7y0^3x0y0^5x0y0^4x0y4^7x0y0^6x-40y-40^6x10y0^6x-40y40|';



