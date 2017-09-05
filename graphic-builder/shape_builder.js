// shape builder

var ShapeBuilder = function(){

  var shape;
  var shapes = [];

  function new_shape(type){
    add_svg_mode = false;
    shape = new Shape(type);
    input.update_input(shape.stats);
    shapes.push(shape);
    displayer.add_svg_to_list(shape);
    displayer.display_svg(shape.build_svg());
  };

  function update_shape(stats){
    shape.update_display_stats(stats);
    displayer.display_svg(shape.build_svg());
  };

  function get_current_shape(){
    return shape;
  };

  function add_shape_to_group(i){
    shape.add_shape(i);
    displayer.display_svg(shape.build_svg());
  };

  function update_transform(stats){
    shape.update_display_stats(stats);
    
    console.log(shape);
    displayer.display_svg(shape.build_svg());
  };

  function get_shape(index){
    return shapes[index];
  };

  function select_shape(index){
    shape = shapes[index];
  };

  function new_group(){
    shape = new Group();
    shapes.push(shape);
    displayer.add_svg_to_list(shape);
    displayer.display_svg('');
  };

  function remove_svg(){
    shape.remove_svg();
    displayer.display_svg(shape);
  };

  function delete_svg(){
    var index = shapes.indexOf(shape);
    displayer.delete_svg(index);
    shapes.splice(index, 1);
    for (var i = 0; i < shapes.length; i++){
      shapes[i].resolve_deletion(index);
    }
    index = (index == shapes.length)? index - 1 : index;
    shape = shapes[index];
    displayer.select_svg_div(index);
  };

  function get_all_shapes(){
    return shapes;
  };

  function set_all_shapes(_shapes_){
    shapes = _shapes_;
  };


  this.new_shape = new_shape;
  this.update_shape = update_shape;
  this.get_current_shape = get_current_shape;
  this.get_shape = get_shape;
  this.select_shape = select_shape;
  this.new_group = new_group;
  this.add_shape_to_group = add_shape_to_group;
  this.update_transform = update_transform;
  this.remove_svg = remove_svg;
  this.delete_svg = delete_svg;
  this.get_all_shapes = get_all_shapes;
  this.set_all_shapes = set_all_shapes;

};

var shapeBuilder = new ShapeBuilder();
