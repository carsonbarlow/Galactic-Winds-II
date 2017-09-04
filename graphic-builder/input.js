window.onload = function(e){

  var stroke_color_input = document.getElementById('stroke_color_input'),
    fill_color_input = document.getElementById('fill_color_input'),
    group_element_x = document.getElementById('group_element_x'),
    group_element_y = document.getElementById('group_element_y'),
    group_element_scale = document.getElementById('group_element_scale'),
    group_element_rotation = document.getElementById('group_element_rotation'),
    opacity_input = document.getElementById('opacity_input');

    stroke_width_input = document.getElementById('stroke_width_input'),
    text_input = document.getElementById('text_input'),
    text_size_input = document.getElementById('text_size_input'),
    height_input = document.getElementById('height_input'),
    width_input = document.getElementById('width_input'),
    top_input = document.getElementById('top_input'),


  stroke_color_input.addEventListener('input', stroke_color_input_changed);
  fill_color_input.addEventListener('input', fill_color_input_changed);

  group_element_x.addEventListener('input', group_element_x_changed);
  group_element_y.addEventListener('input', group_element_y_changed);
  group_element_scale.addEventListener('input', group_element_scale_changed);
  group_element_rotation.addEventListener('input', group_element_rotation_changed);


  stroke_width_input.addEventListener('input', stroke_width_input_changed);
  text_input.addEventListener('input', text_input_changed);
  text_size_input.addEventListener('input', text_size_input_changed);

  height_input.addEventListener('input', height_input_changed);
  width_input.addEventListener('input', width_input_changed);
  top_input.addEventListener('input', top_input_changed);
  opacity_input.addEventListener('input', opacity_input_changed);

  document.getElementById('elips').addEventListener('click', elips_pressed);
  document.getElementById('rectangle').addEventListener('click', rectangle_pressed);
  document.getElementById('triangle').addEventListener('click', triangle_pressed);
  document.getElementById('text').addEventListener('click', text_pressed);

  document.getElementById('new_group').addEventListener('click', new_group_pressed);
  document.getElementById('add_svg').addEventListener('click', add_svg_pressed);
  document.getElementById('remove_svg').addEventListener('click', remove_svg_pressed);

  document.getElementById('delete_svg').addEventListener('click', delete_svg_pressed);

  document.getElementById('font_select').addEventListener('change', font_select_changed);

  displayer.assign_list_display(document.getElementById('svg_list'));
  displayer.assign_main_display(document.getElementById('current_graphic'));

  // =========================== text updates =======================================


  function update_input(stats){
    var stats_to_input_map = {
      width: width_input,
      height: height_input,
      top: top_input,
      color: fill_color_input,
      stroke: stroke_width_input,
      stroke_color: stroke_color_input,
      // opacity: opacity_input,
      text: text_input,
      font_size: text_size_input,
      x: group_element_x,
      y: group_element_y,
      scale: group_element_scale,
      rotation: group_element_rotation
    }

    for (var stat in stats){
      if (typeof stats_to_input_map[stat] !== 'undefined'){
        stats_to_input_map[stat].value = stats[stat];
      }
    }

  };



  // ============================ Event Functions =====================================

  function elips_pressed(e){
    shapeBuilder.new_shape('e');
  };

  function rectangle_pressed(e){
    shapeBuilder.new_shape('r');
  };

  function triangle_pressed(e){
    shapeBuilder.new_shape('t');
  };

  function text_pressed(e){
    shapeBuilder.new_shape('x');
  };

  function new_group_pressed(e){
    shapeBuilder.new_group();
  };

  function add_svg_pressed(e){
    add_svg_mode = true;
  };

  function remove_svg_pressed(e){
    shapeBuilder.remove_svg();
  };

  var svg_index;
  var svg_x = 0;
  var svg_y = 0;
  var svg_scale = 1;
  var svg_rotation = 0;


  function delete_svg_pressed(e){
    shapeBuilder.delete_svg();
  };

  // inputs
  function stroke_width_input_changed(e){
    shapeBuilder.update_shape({stroke: parseFloat(e.target.value)});
  };

  function height_input_changed(e){
    shapeBuilder.update_shape({height: parseInt(e.target.value)});
  };

  function text_input_changed(e){
    shapeBuilder.update_shape({text: e.target.value});
  };

  function text_size_input_changed(e){
    shapeBuilder.update_shape({font_size: e.target.value});
  };

  function font_select_changed(e){
    shapeBuilder.update_shape({font_family: e.target.value});
  };

  function width_input_changed(e){
    shapeBuilder.update_shape({width: parseInt(e.target.value)});
  };

  function top_input_changed(e){
    shapeBuilder.update_shape({top: parseInt(e.target.value)});
  };

  function stroke_color_input_changed(e){
  shapeBuilder.update_shape({stroke_color: e.target.value.substring(0,3)});};

  function fill_color_input_changed(e){
    shapeBuilder.update_shape({color: e.target.value.substring(0,3)});
  };

  function group_element_x_changed(e){
    shapeBuilder.update_transform({x: parseFloat(e.target.value) || 0});
  };

  function group_element_y_changed(e){
    shapeBuilder.update_transform({y: parseFloat(e.target.value) || 0});  };

  function group_element_scale_changed(e){
    shapeBuilder.update_transform({scale: parseFloat(e.target.value) || 1});
  };

  function group_element_rotation_changed(e){
    shapeBuilder.update_transform({rotation: parseFloat(e.target.value) || 0});
  };
  function opacity_input_changed(e){
    shapeBuilder.update_transform({opacity: parseFloat(e.target.value)});
  };

  input.update_input = update_input;

  shapeBuilder.new_shape('r');
  shapeBuilder.update_shape(test_rect);
  shapeBuilder.new_shape('e');
  shapeBuilder.update_shape(test_elips);
  shapeBuilder.new_shape('t');
  shapeBuilder.update_shape(test_triangle);
};


var add_svg_mode = false;
var input = {};



// seed data

var test_rect = {
    type: 'r',
    width: 8,
    height: 15,
    color: '882',
    stroke: 0.5,
    stroke_color: '228'
  },
  test_elips = {
    type: 'e',
    width: 15,
    height: 5,
    color: '005',
    stroke: 1,
    stroke_color: '082'
  },
  test_triangle = {
    type: 't',
    width: 60,
    height: 10,
    color: '840',
    stroke: 2,
    stroke_color: '000'
  }


// TODO: compress svg array
// TODO: post compressed svg array to server
// TODO: create endpoint to recieve svg array post
// TODO: save compressed svg array to file.


