
var Transform = function(shape_index){

  var stats = {
    shape_index: shape_index,
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    opacity: 1
  };


  function update_transform_stats(new_stats){
    for (var stat in new_stats){
      stats[stat] = new_stats[stat];
    }
  };

  function build_svg(){
    var svg_text = shapeBuilder.get_shape(stats.shape_index).build_svg();
    if (svg_text[1] == 'g'){
      svg_text = svg_text.substring(0, 2) + build_transform() + svg_text.substring(2);
    }else{
      svg_text = svg_text.substring(0, svg_text.length - 3) + build_transform() + svg_text.substring(svg_text.length - 3);
    }
    return svg_text;
  };

  function build_transform(){
    return ' transform="translate('+stats.x+','+stats.y+') rotate('+stats.rotation+' '+(stats.scale*50)+' '+(stats.scale*50)+') scale('+stats.scale+')"' + build_opacity();
  };

  function build_opacity(){
    if (stats.opacity < 1){
      return 'opacity="'+stats.opacity+'"';
    }
    return '';
  };



  this.update_transform_stats = update_transform_stats;
  this.build_svg = build_svg;
  this.stats = stats;

};
