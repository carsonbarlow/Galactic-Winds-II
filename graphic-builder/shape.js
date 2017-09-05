// shape objects

var Shape = function(type){
  var stats = {
    type: type,
    width: 10,
    height: 10,
    top: 50,
    color: '000',
    stroke: 0,
    stroke_color: '000',
    text: 'text',
    font_family: 0,
    font_size: 10
  };

  var FONT_FAMILY_ENUM = ['Arial','Verdana'];

  function update_display_stats(new_stats){
    for (var stat in new_stats){
      stats[stat] = new_stats[stat];
    }
  };

  function build_svg(){
    var shape_index = {
      e: build_elips,
      r: build_rectangle,
      t: build_triangle,
      x: build_text
    }
    return shape_index[stats.type]();
  };

  function build_elips(){
    return '<ellipse fill="#'+stats.color+'" cx="50" cy="50" rx="'+stats.width+'" ry="'+stats.height+'" '+build_options()+' />';
  };
  function build_rectangle(){
    return '<rect fill="#'+stats.color+'" x="'+((100-stats.width)/2)+'" y="'+((100-stats.height)/2)+'" width="'+stats.width+'" height="'+stats.height+'" '+build_options()+' />';
  };

  function build_triangle(){

    var x1 = (100 - stats.width)/2;
    var y1 = 50 + (stats.height/2);

    var x2 = 50 + (stats.width/2);
    var y2 = y1;

    var x3 = stats.top;
    var y3 = (100 - stats.height)/2;

    return '<polygon fill="#'+stats.color+'" points="'+x1+','+y1+','+x2+','+y2+','+x3+','+y3+'" '+build_options()+' />';
  };

  function build_text(){
    return '<text x="0" y="50" fill="#'+stats.color+'" font-family="'+FONT_FAMILY_ENUM[stats.font_family]+'" font-size="'+stats.font_size+'"'+build_options()+' >'+stats.text+'</text>';
  };


  function build_options(){
    return_val = '';
    if (stats.stroke){
      return_val += ' stroke="#'+stats.stroke_color+'" stroke-width="'+stats.stroke+'"';
    }
    if (stats.opacity < 1){
      return_val += ' opacity="'+stats.opacity+'"'
    }
    return return_val;
  };

  function remove_svg(){'...'};
  function resolve_deletion(index){'...'};

  this.stats = stats;
  this.update_display_stats = update_display_stats;
  this.build_svg = build_svg;
  this.remove_svg = remove_svg;
  this.resolve_deletion = resolve_deletion;

};
