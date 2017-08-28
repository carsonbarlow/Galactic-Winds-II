
window.onload = function(e){

  document.getElementById('stroke_color_input').addEventListener('input', stroke_color_input_changed);
  document.getElementById('fill_color').addEventListener('input', fill_color_changed);

  document.getElementById('elips').addEventListener('click', elips_pressed);
  document.getElementById('rectangle').addEventListener('click', rectangle_pressed);
  document.getElementById('triangle').addEventListener('click', triangle_pressed);
  document.getElementById('text').addEventListener('click', text_pressed);

  document.getElementById('new_group').addEventListener('click', new_group_pressed);
  document.getElementById('add_svg').addEventListener('click', add_svg_pressed);
  document.getElementById('remove_svg').addEventListener('click', remove_svg_pressed);

  document.getElementById('group_element_x').addEventListener('input', group_element_x_changed);
  document.getElementById('group_element_y').addEventListener('input', group_element_y_changed);
  document.getElementById('group_element_scale').addEventListener('input', group_element_scale_changed);
  document.getElementById('group_element_rotation').addEventListener('input', group_element_rotation_changed);



  document.getElementById('stroke_width_input').addEventListener('input', stroke_width_input_changed);

  input_text = document.getElementById('text_input');
  input_text.addEventListener('input', text_input_changed);
  input_text_size = document.getElementById('text_size_input');
  input_text_size.addEventListener('input', text_size_input_changed);


  document.getElementById('height_input').addEventListener('input', height_input_changed);
  document.getElementById('width_input').addEventListener('input', width_input_changed);
  document.getElementById('top_input').addEventListener('input', top_input_changed);

  document.getElementById('save_svg').addEventListener('click', save_svg_pressed);
  document.getElementById('update_svg').addEventListener('click', update_svg_pressed);
  document.getElementById('delete_svg').addEventListener('click', delete_svg_pressed);
  svg_list = document.getElementById('svg_list');
};

var input_text,
  input_text_size,
  input_stroke_width,
  input_height,
  input_width,
  input_top,
  svg_list,
  svg_list_index;

function stroke_color_input_changed(e){
  svg_stroke_color = e.target.value.substring(0,3);
  build_svg();
};

function fill_color_changed(e){
  svg_fill_color = e.target.value.substring(0,3);
  build_svg();
};

function build_svg_specs(){
  var a = [
    current_shape,
    svg_fill_color,
    svg_height,
    svg_width,
    svg_top
    ];
  if (current_shape === 'x'){
    a = [
    current_shape,
    svg_fill_color,
    font_family,
    font_size
    ];
  }
  if (stroke_width){
    a.push('s'+svg_stroke_color+stroke_width);
  }
  return a;
};

function unpack_svg_specs(a){
  current_shape = a[0];
  svg_fill_color = a[1];
  if (current_shape !== 'x'){
    svg_height = a[2];
    svg_width = a[3];
    svg_top = a[5];
  }else{
    font_family = a[2];
    font_size = a[3];
  }
  for (var i = 4; i < a.length; i++){
    if (a[i][0] == 's'){
      svg_stroke_color = a[i].substring(1,4);
      stroke_width = a[i].substring(4);
    }
  }
};

function save_svg_pressed(e){
  svg_array.push(build_svg_specs());
  svg_array_index = svg_array.length -1;
  console.log(svg_array[svg_array_index]);
  add_svg_to_list(current_svg);
};

function update_svg_pressed(e){
  svg_array[svg_list_index] = build_svg_specs();
  var current_selected = document.getElementsByClassName('selected');
  for (var i = 0; i < current_selected.length; i++){
    current_selected[i].innerHTML = current_svg;
  }
};

function delete_svg_pressed(e){
  var current_selected = document.getElementsByClassName('selected');
  for (var i = 0; i < current_selected.length; i++){
    current_selected = current_selected[i];
    break;
  }
  svg_list.removeChild(current_selected);
  svg_array.splice(svg_list_index,1);
};

function add_svg_to_list(svg){
  var svg_div = document.createElement('div');
  svg_div.classList.add('svg_list_div');
  svg_div.innerHTML = svg;
  svg_div.addEventListener('click', svg_div_clicked);
  svg_list.appendChild(svg_div);
}

function svg_div_clicked(e){
  var current_selected = document.getElementsByClassName('selected');
  for (var i = 0; i < current_selected.length; i++){
    current_selected[i].classList.remove('selected');
  }
  this.classList.add('selected');
  var svg_list_children = svg_list.childNodes;
  for (i = 0; i < svg_list_children.length; i++){
    if (svg_list_children[i] == this){
      svg_list_index = i;
      unpack_svg_specs(svg_array[i]);
      build_svg();
    }
  }
}


// DONE: display saved svgs
// DONE: select from svg list
// DONE: update svg
// DONE: delete saved svgs
// DONE: make stroke optional
// DONE: text and attributes
// DONE: unpack svg from array
// TODO: svg groups
// TODO: add svgs to groups
// TODO: remove svgs to groups
// TODO: save svg groups to svg array
// TODO: delete svg groups from svg array
// TODO: compress svg array
// TODO: post compressed svg array to server
// TODO: create endpoint to recieve svg array post
// TODO: save compressed svg array to file.

var svg_array = [];
var svg_array_index = 0;

var current_svg = '';
var svg_display = document.getElementById('current_graphic');
var stroke_width = 0;
var svg_stroke_color = '000';
var svg_fill_color = '000';

var svg_height = 10;
var svg_width = 10;
var svg_top = 50;

var current_shape = 'e';

function build_ellipse(){
  current_svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 50 50" xml:space="preserve"><ellipse fill="#'+svg_fill_color+'" cx="50" cy="50" rx="'+svg_height+'" ry="'+svg_width+'" '+svg_stroke()+'/></svg>';
};

function svg_stroke(){
  if (stroke_width > 0){
    return 'stroke="#'+svg_stroke_color+'" stroke-width="'+stroke_width+'"';
  }
  return '';
};

function build_rectangle(){
  current_svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 50 50" xml:space="preserve"><rect fill="#'+svg_fill_color+'" x="'+((100-svg_width)/2)+'" y="'+((100-svg_height)/2)+'" width="'+svg_width+'" height="'+svg_height+'" '+svg_stroke()+' /></svg>';
};

function build_triangle(){

  var x1 = (100 - svg_width)/2;
  var y1 = 50 + (svg_height/2);

  var x2 = 50 + (svg_width/2);
  var y2 = y1;

  var x3 = svg_top;
  var y3 = (100 - svg_height)/2;

  current_svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 50 50" xml:space="preserve"><polygon fill="#'+svg_fill_color+'" points="'+x1+','+y1+','+x2+','+y2+','+x3+','+y3+'" '+svg_stroke()+' /></svg>';
};

var svg_text = 'hello world';
var font_family_enum = ['Arial','Verdana'];
var font_family = 0;
var font_size = 12;
function build_text(){
  current_svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 50 50" xml:space="preserve"><text y="50" fill="#'+svg_fill_color+'" font-family="'+font_family_enum[font_family]+'" font-size="'+font_size+'"'+svg_stroke()+' >'+svg_text+'</text></svg>';
};

function build_svg(){
  if (current_shape === 'e'){
    build_ellipse();
  }else if(current_shape === 'r'){
    build_rectangle();
  }else if(current_shape === 't'){
    build_triangle();
  }else{
    build_text();
  }

  display_svg(current_svg);
};

function display_svg(svg){
  svg_display.innerHTML = svg;
};

// TODO: get text in and out of here.
var text_array = [];


// ============================ Group Dynamics =====================================


var applied_svg_list = [];
var applied_svg_list_index = 0;

var svg_index;
var svg_x = 50;
var svg_y = 50;
var svg_scale = 1;
var svg_rotation = 0;

function build_applied_svg(){
  var a = [
    svg_index,
    svg_x,
    svg_y,
    svg_scale,
    svg_rotation
  ];
  return a;
};
































// ============================ Event Functions =====================================

function elips_pressed(e){
  current_shape = 'e';
  build_svg();
};

function rectangle_pressed(e){
  current_shape = 'r';
  build_svg();
};

function triangle_pressed(e){
  current_shape = 't';
  build_svg();
};

function text_pressed(e){
  current_shape = 'x';
  build_svg();
};

function new_group_pressed(e){
  console.log('new_group pressed');
};

function add_svg_pressed(e){
  console.log('add_svg pressed');
};

function remove_svg_pressed(e){
  console.log('remove_svg pressed');
};
var svg_index;
var svg_x = 50;
var svg_y = 50;
var svg_scale = 1;
var svg_rotation = 0;


// inputs
function stroke_width_input_changed(e){
  stroke_width = parseFloat(e.target.value);
  build_svg();
};

function height_input_changed(e){
  svg_height = parseInt(e.target.value);
  build_svg();
};

function text_input_changed(e){
  svg_text = input_text.value;
  build_svg();
};

function text_size_input_changed(e){
  font_size = input_text_size.value;
  build_svg();
};

function width_input_changed(e){
  svg_width = parseInt(e.target.value);
  build_svg();
};

function top_input_changed(e){
  svg_top = parseInt(e.target.value);
  build_svg();
};

function group_element_x_changed(e){
  svg_x = parseInt(e.target.value);
  build_svg();
};

function group_element_y_changed(e){
  svg_y = parseInt(e.target.value);
  build_svg();
};

function group_element_scale_changed(e){
  svg_scale = parseFloat(e.target.value);
  build_svg();
};

function group_element_rotation_changed(e){
  svg_rotation = parseInt(e.target.value);
  build_svg();
};
