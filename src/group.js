
var Group = function(){

  var transform;
  var transform_list = [];
  var stats = {
    type: 'g',
    transforms: transform_list
  }

  function add_shape(shape_index){
    transform = new Transform(shape_index);
    transform_list.push(transform);
    input.update_input(transform.stats);
  };

  function update_transform_list(transforms){
    transform_list = transforms;
    stats.transforms = transform_list;
    transform = transform_list[transform_list.length - 1];
  }

  function build_svg(){
    var svg_text = '<g>';
    for (var i = 0; i < transform_list.length; i++){
      svg_text += transform_list[i].build_svg();
    }
    svg_text += '</g>';
    return svg_text;
  };

  this.stats = stats;
  this.add_shape = add_shape;
  this.build_svg = build_svg;
  this.update_transform_list = update_transform_list;

};
