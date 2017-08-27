
window.onload = function(e){

  document.getElementById('stroke_color_red_up').addEventListener('click', stroke_color_red_up_pressed);
  document.getElementById('stroke_color_red_down').addEventListener('click', stroke_color_red_down_pressed);
  document.getElementById('stroke_color_green_up').addEventListener('click', stroke_color_green_up_pressed);
  document.getElementById('stroke_color_green_down').addEventListener('click', stroke_color_green_down_pressed);
  document.getElementById('stroke_color_blue_up').addEventListener('click', stroke_color_blue_up_pressed);
  document.getElementById('stroke_color_blue_down').addEventListener('click', stroke_color_blue_down_pressed);

  document.getElementById('fill_color_red_up').addEventListener('click', fill_color_red_up_pressed);
  document.getElementById('fill_color_red_down').addEventListener('click', fill_color_red_down_pressed);
  document.getElementById('fill_color_green_up').addEventListener('click', fill_color_green_up_pressed);
  document.getElementById('fill_color_green_down').addEventListener('click', fill_color_green_down_pressed);
  document.getElementById('fill_color_blue_up').addEventListener('click', fill_color_blue_up_pressed);
  document.getElementById('fill_color_blue_down').addEventListener('click', fill_color_blue_down_pressed);

  document.getElementById('elips').addEventListener('click', elips_pressed);
  document.getElementById('rectangle').addEventListener('click', rectangle_pressed);
  document.getElementById('triangle').addEventListener('click', triangle_pressed);


  input_stroke_width = document.getElementById('stroke_width_input');
  input_stroke_width.addEventListener('input', stroke_width_input_changed);
  input_height = document.getElementById('height_input');
  input_height.addEventListener('input', height_input_changed);
  input_width = document.getElementById('width_input');
  input_width.addEventListener('input', width_input_changed);
  input_top = document.getElementById('top_input');
  input_top.addEventListener('input', top_input_changed);

  document.getElementById('save_svg').addEventListener('click', save_svg_pressed);
  document.getElementById('update_svg').addEventListener('click', update_svg_pressed);
  document.getElementById('delete_svg').addEventListener('click', delete_svg_pressed);
  svg_list = document.getElementById('svg_list');
};

var input_stroke_width,
  input_height,
  input_width,
  input_top,
  svg_list,
  svg_list_index;


function stroke_color_red_up_pressed(e){
  console.log('stroke_color_red_up pressed');
  if (svg_stroke_R < 15){svg_stroke_R++;}
  build_svg();
};

function stroke_color_red_down_pressed(e){
  console.log('stroke_color_red_down pressed');
  if (svg_stroke_R > 0){svg_stroke_R--;}
  build_svg();
};

function stroke_color_green_up_pressed(e){
  console.log('stroke_color_green_up pressed');
  if (svg_stroke_G < 15){svg_stroke_G++;}
  build_svg();
};

function stroke_color_green_down_pressed(e){
  console.log('stroke_color_green_down pressed');
  if (svg_stroke_G > 0){svg_stroke_G--;}
  build_svg();
};

function stroke_color_blue_up_pressed(e){
  console.log('stroke_color_blue_up pressed');
  if (svg_stroke_B < 15){svg_stroke_B++;}
  build_svg();
};

function stroke_color_blue_down_pressed(e){
  console.log('stroke_color_blue_down pressed');
  if (svg_stroke_B > 0){svg_stroke_B--;}
  build_svg();
};

function fill_color_red_up_pressed(e){
  console.log('fill_color_red_up pressed');
  if (svg_fill_R < 15){svg_fill_R++;}
  build_svg();
};

function fill_color_red_down_pressed(e){
  console.log('fill_color_red_down pressed');
  if (svg_fill_R > 0){svg_fill_R--;}
  build_svg();
};

function fill_color_green_up_pressed(e){
  console.log('fill_color_green_up pressed');
  if (svg_fill_G < 15){svg_fill_G++;}
  build_svg();
};

function fill_color_green_down_pressed(e){
  console.log('fill_color_green_down pressed');
  if (svg_fill_G > 0){svg_fill_G--;}
  build_svg();
};

function fill_color_blue_up_pressed(e){
  console.log('fill_color_blue_up pressed');
  if (svg_fill_B < 15){svg_fill_B++;}
  build_svg();
};

function fill_color_blue_down_pressed(e){
  console.log('fill_color_blue_down pressed');
  if (svg_fill_B > 0){svg_fill_B--;}
  build_svg();
};

function elips_pressed(e){
  console.log('elips pressed');
  current_shape = 'e'
  build_svg();
};

function rectangle_pressed(e){
  console.log('rectangle pressed');
  current_shape = 'r';
  build_svg();
};

function triangle_pressed(e){
  console.log('triangle pressed');
  current_shape = 't';
  build_svg();
};

function stroke_width_input_changed(e){
  console.log('stroke_width_input changed');
  stroke_width = parseFloat(stroke_width_input.value);
  build_svg();
};

function height_input_changed(e){
  console.log('height_input changed');
  svg_height = parseInt(input_height.value);
  build_svg();
};

function width_input_changed(e){
  console.log('width_input changed');
  svg_width = parseInt(input_width.value);
  build_svg();
};

function top_input_changed(e){
  console.log('top_input changed');
  svg_top = parseInt(input_top.value);
  build_svg();
};

function build_svg_specs(){
  var a = [
    current_shape,
    num_to_hex[svg_fill_R],
    num_to_hex[svg_fill_G],
    num_to_hex[svg_fill_B],
    svg_height,
    svg_width,
    svg_top
    ];
  if (stroke_width){
    a.push('s'+num_to_hex[svg_stroke_R]+num_to_hex[svg_stroke_G]+num_to_hex[svg_stroke_B]+stroke_width);
  }
  return a;
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
    }
  }
}


// DONE: display saved svgs
// DONE: select from svg list
// DONE: update svg
// DONE: delete saved svgs
// DONE: make stroke optional
// TODO: text and attributes
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
var svg_stroke_R = 0;
var svg_stroke_G = 0;
var svg_stroke_B = 0;

var svg_fill_R = 0;
var svg_fill_G = 0;
var svg_fill_B = 0;

var svg_height = 10;
var svg_width = 10;
var svg_top = 50;

var current_shape = 'e';

var num_to_hex = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

function build_ellipse(){
  current_svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 50 50" xml:space="preserve"><ellipse fill="#'+num_to_hex[svg_fill_R]+num_to_hex[svg_fill_G]+num_to_hex[svg_fill_B]+'" cx="50" cy="50" rx="'+svg_height+'" ry="'+svg_width+'" '+svg_stroke()+'/></svg>';
};

function svg_stroke(){
  if (stroke_width > 0){
    return 'stroke="#'+num_to_hex[svg_stroke_R]+num_to_hex[svg_stroke_G]+num_to_hex[svg_stroke_B]+'" stroke-width="'+stroke_width+'"';
  }
  return '';
};

function build_rectangle(){
  current_svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 50 50" xml:space="preserve"><rect fill="#'+num_to_hex[svg_fill_R]+num_to_hex[svg_fill_G]+num_to_hex[svg_fill_B]+'" x="'+((100-svg_width)/2)+'" y="'+((100-svg_height)/2)+'" width="'+svg_width+'" height="'+svg_height+'" '+svg_stroke()+' /></svg>';
};

function build_triangle(){

  var x1 = (100 - svg_width)/2;
  var y1 = 50 + (svg_height/2);

  var x2 = 50 + (svg_width/2);
  var y2 = y1;

  var x3 = svg_top;
  var y3 = (100 - svg_height)/2;

  current_svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 50 50" xml:space="preserve"><polygon fill="#'+num_to_hex[svg_fill_R]+num_to_hex[svg_fill_G]+num_to_hex[svg_fill_B]+'" points="'+x1+','+y1+','+x2+','+y2+','+x3+','+y3+'" '+svg_stroke()+' /></svg>';
};

function build_svg(){
  if (current_shape === 'e'){
    build_ellipse();
  }else if(current_shape === 'r'){
    build_rectangle();
  }else{
    build_triangle();
  }

  display_svg(current_svg);
};

function display_svg(svg){
  svg_display.innerHTML = svg;
};