
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

  function update_display_stats(stats){
    transform.update_transform_stats(stats);
  };

  function remove_svg(){
    transform_list.pop();
    transform = transform_list[transform_list.length - 1];
  };

  function resolve_deletion(index){
    for (var i = 0; i < transform_list.length; i++){
      if (transform_list[i].stats.shape_index == index){
        transform_list.splice(i, 1);
        i--;
        continue;
      }
      transform_list[i].stats.shape_index = UTILS.subtract_floor(transform_list[i].stats.shape_index, index);
    }
  };

  this.stats = stats;
  this.add_shape = add_shape;
  this.build_svg = build_svg;
  this.update_display_stats = update_display_stats;
  this.remove_svg = remove_svg;
  this.resolve_deletion = resolve_deletion;
  this.update_transform_list = update_transform_list;

};
