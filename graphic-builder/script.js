
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

  for (var i = 0; i < svg_array.length; i++){
    unpack_svg_specs(svg_array[i]);
    build_svg();
    add_svg_to_list(current_svg);
  }
};

var group_mode = false;

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
  if (current_shape == 'g'){
    var return_text = unpack_svg_group(a);
    group_selected = true;
    return return_text;
  }
  group_selected = false;
  svg_fill_color = a[1];
  if (current_shape !== 'x'){
    svg_height = a[2];
    svg_width = a[3];
    svg_top = a[4];
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

function unpack_svg_group(a){
  var transform;
  var svg_group_text = '<g>';
  for (var i = 1; i < a.length; i++){
    transform = applied_svg_list[a[i]];
    unpack_transform(transform);
    svg_group_text += add_transforms(build_shape(current_shape));
  }
  svg_group_text += '</g>';
  display_svg(wrap_into_svg(svg_group_text));
  return svg_group_text;
};

function add_svg_to_list(svg){
  var svg_div = document.createElement('div');
  svg_div.classList.add('svg_list_div');
  svg_div.innerHTML = svg;
  svg_div.addEventListener('click', svg_div_clicked);
  svg_list.appendChild(svg_div);
}

var group_selected = false;

function svg_div_clicked(e){
  deselect_svg_div();
  this.classList.add('selected');
  var svg_list_children = svg_list.childNodes;
  for (i = 0; i < svg_list_children.length; i++){
    if (svg_list_children[i] == this){
      svg_list_index = i;
      unpack_svg_specs(svg_array[i]);
      if (!group_selected){
        if (!group_mode){
          build_svg();
        }else{
          build_svg_for_group();
        }
      }
    }
  }
}

function deselect_svg_div(){
  div_deselected = false;
  var current_selected = document.getElementsByClassName('selected');
  for (var i = 0; i < current_selected.length; i++){
    current_selected[i].classList.remove('selected');
    div_deselected = true;
  }
  return div_deselected;
}

// TODO: remove svgs to groups
// TODO: save svg groups to svg array
// TODO: delete svg groups from svg array
// TODO: svg groups
// TODO: compress svg array
// TODO: post compressed svg array to server
// TODO: create endpoint to recieve svg array post
// TODO: save compressed svg array to file.

var svg_array = [
  ["t", "df5", 50, 20, 40, "s2181"],
  ["e", "1f5", 10, 5, 40, "s2181"],
  ["r", "2fe", 35, 45, 40, "s2181"],
  ["g", 0, 1, 2, 3]];
var svg_array_index = 0;

var current_svg = '';
var svg_display = document.getElementById('current_graphic');

// ============================ Build Shapes =====================================

var stroke_width = 0;
var svg_stroke_color = '000';
var svg_fill_color = '000';

var svg_height = 10;
var svg_width = 10;
var svg_top = 50;

var current_shape = 'e';

function build_ellipse(){
  return '<ellipse fill="#'+svg_fill_color+'" cx="50" cy="50" rx="'+svg_height+'" ry="'+svg_width+'" '+svg_stroke()+'/>';
};

function svg_stroke(){
  if (stroke_width > 0){
    return 'stroke="#'+svg_stroke_color+'" stroke-width="'+stroke_width+'"';
  }
  return '';
};

function build_rectangle(){
  return '<rect fill="#'+svg_fill_color+'" x="'+((100-svg_width)/2)+'" y="'+((100-svg_height)/2)+'" width="'+svg_width+'" height="'+svg_height+'" '+svg_stroke()+' />';
};

function build_triangle(){

  var x1 = (100 - svg_width)/2;
  var y1 = 50 + (svg_height/2);

  var x2 = 50 + (svg_width/2);
  var y2 = y1;

  var x3 = svg_top;
  var y3 = (100 - svg_height)/2;

  return '<polygon fill="#'+svg_fill_color+'" points="'+x1+','+y1+','+x2+','+y2+','+x3+','+y3+'" '+svg_stroke()+' />';
};

var svg_text = 'hello world';
var font_family_enum = ['Arial','Verdana'];
var font_family = 0;
var font_size = 12;
function build_text(){
  return '<text y="50" fill="#'+svg_fill_color+'" font-family="'+font_family_enum[font_family]+'" font-size="'+font_size+'"'+svg_stroke()+' >'+svg_text+'</text>';
};

function build_shape(shape){
  if (shape === 'e'){
    return build_ellipse();
  }else if(shape === 'r'){
    return build_rectangle();
  }else if(shape === 't'){
    return build_triangle();
  }else if(shape === 'x'){
    return build_text();
  }
  return '';
};

function build_svg(){
  current_svg = wrap_into_svg(build_shape(current_shape));
  display_svg(current_svg);
};

function wrap_into_svg(svg){
  return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 50 50" xml:space="preserve">'+svg+'</svg>';
};

function display_svg(svg){
  svg_display.innerHTML = svg;
};

// ============================ Group Dynamics =====================================


function build_transform(){
  var a = [
    svg_list_index,
    svg_x,
    svg_y,
    svg_scale,
    svg_rotation
  ];
  return a;
};

function unpack_transform(a){
  unpack_svg_specs(svg_array[a[0]]);
  svg_list_index = a[0];
  svg_x = a[1];
  svg_y = a[2];
  svg_scale = a[3];
  svg_rotation = a[4];
};

var svg_group_spec_array = [];
var current_svg_group = '<g>';

function build_svg_for_group(){
  build_shape(current_shape);
  build_svg_group();
};

function build_svg_group(shape){
  var svg_group = current_svg_group + add_transforms(build_shape(current_shape)) + '</g>';
  display_svg(wrap_into_svg(svg_group));
};

function add_transforms(shape){
  if (!shape){return '';}
  var cap = shape.substring(shape.length - 2);
  var return_shape = shape.substring(0, shape.length - 2);
  return return_shape + ' transform="translate('+svg_x+','+svg_y+') rotate('+svg_rotation+' '+(svg_scale*50)+' '+(svg_scale*50)+') scale('+svg_scale+')"'+cap;
};

function add_shape_to_group(){
  current_svg_group = current_svg_group + add_transforms(build_shape(current_shape));
  save_svg_transform();
  deselect_svg_div();
};

function remove_shape_from_group(){
  current_shape = '';
  if (deselect_svg_div()){
    build_svg_group();
  }else{
    var substring_indecies = find_last_element(current_svg_group);
    current_svg_group = current_svg_group.substring(0, substring_indecies[0]);
    remove_transfrom_from_array(applied_svg_list_index);
    build_svg_group();
  }
};

function find_last_element(_svg_text_){
  var shape_end_index,
    shape_begin_index;

  var svg_text = _svg_text_.substring(3);
  var is_group = false;

  for (var i = svg_text.length; i > -1; i--){
    if (svg_text[i] == '>' && !is_group){
      shape_end_index = i + 1;
      if (svg_text[i-1] == 'g'){
        is_group = true;
      }
      continue;
    }
    if (svg_text[i] == '<'){
      if (svg_text[i+1] != '/'){
        if (!is_group){
          shape_begin_index = i;
          return [shape_begin_index+3, shape_end_index+3];
        }else if (svg_text[i+1] == 'g'){
          shape_begin_index = i;
          return [shape_begin_index+3, shape_end_index+4];
        }      
      }
    }
  }
};

function remove_transfrom_from_array(index){
  
  // TODO: remove the index from the svg_group_spec_array
  // TODO: remove the index from the total array if not in use any more
  // TODO: update all the groups with new indicies if removed from total array
  // TODO: update applied_svg_list_index to next transfrom on svg_group_spec_array
};

// var test_group = '<g><ellipse fill="#1f5" cx="50" cy="50" rx="10" ry="5" stroke="#218" stroke-width="1" transform="translate(0,8) rotate(50 40 40) scale(0.8)"/><g><polygon fill="#df5" points="40,75,60,75,40,25" stroke="#218" stroke-width="1"  transform="translate(0,0) rotate(0 50 50) scale(1)"/><rect fill="#2fe" x="27.5" y="32.5" width="45" height="35" stroke="#218" stroke-width="1"  transform="translate(0,8) rotate(50 40 40) scale(0.8)"/><ellipse fill="#1f5" cx="50" cy="50" rx="10" ry="5" stroke="#218" stroke-width="1" transform="translate(0,8) rotate(50 40 40) scale(0.8)"/></g><polygon fill="#df5" points="40,75,60,75,40,25" stroke="#218" stroke-width="1"  transform="translate(0,0) rotate(0 50 50) scale(1)"/><rect fill="#2fe" x="27.5" y="32.5" width="45" height="35" stroke="#218" stroke-width="1"  transform="translate(0,8) rotate(50 40 40) scale(0.8)"/><ellipse fill="#1f5" cx="50" cy="50" rx="10" ry="5" stroke="#218" stroke-width="1" transform="translate(0,8) rotate(50 40 40) scale(0.8)"/></g>';

// var test_group = '<g><ellipse /><g><polygon /><rect /><ellipse/></g><polygon /><rect /><ellipse /></g>';


function compare_arrays(a1, a2){
  if (a1.length != a2.length){
    return false;
  }
  for (var i = 0; i < a1.length; i++){
    if (a1[i] != a2[i]){
      return false;
    }
  }
  return true;
}

function save_svg_transform(){

  var duplicate_transform = false;
  var built_array = build_transform();
  for (var i = 0; i < applied_svg_list.length; i++){
    if (compare_arrays(applied_svg_list[i], built_array)){
      duplicate_transform = true;
      applied_svg_list_index = i;
      break;
    }
  }
  if (!duplicate_transform){
    applied_svg_list.push(build_transform());
    applied_svg_list_index = applied_svg_list.length - 1;
  }
  svg_group_spec_array.push(applied_svg_list_index);
  
  console.log( "applied_svg_list:", applied_svg_list );
  
  console.log( "svg_group_spec_array:", svg_group_spec_array );
};

// TODO: get text in and out of here.
var text_array = [];

var applied_svg_list = [
  [2, 0, 0, 1, 45],
  [1, 0, 0, 1, 45],
  [0, 31, 15, 1, 45],
  [0, -31, -15, 1, 225]
];
var applied_svg_list_index = 3;

var svg_index;
var svg_x = 50;
var svg_y = 50;
var svg_scale = 1;
var svg_rotation = 0;





// ============================ Event Functions =====================================

function elips_pressed(e){
  current_shape = 'e';
  group_mode = false;
  build_svg();
};

function rectangle_pressed(e){
  current_shape = 'r';
  group_mode = false;
  build_svg();
};

function triangle_pressed(e){
  current_shape = 't';
  group_mode = false;
  build_svg();
};

function text_pressed(e){
  current_shape = 'x';
  group_mode = false;
  build_svg();
};

function new_group_pressed(e){
  group_mode = true;
  svg_group_spec_array = ['g'];
  current_shape = 'g';
  current_svg = '';
  current_svg_group = '<g>'
  display_svg(current_svg);
};

function add_svg_pressed(e){
  add_shape_to_group();
};

function remove_svg_pressed(e){
  remove_shape_from_group();
};

var svg_index;
var svg_x = 0;
var svg_y = 0;
var svg_scale = 1;
var svg_rotation = 0;


function save_svg_pressed(e){
  if (group_mode){
    svg_array.push(svg_group_spec_array);
    var svg_group = current_svg_group + add_transforms(build_shape(current_shape)) + '</g>';
    current_svg = wrap_into_svg(svg_group);
  }else{
    svg_array.push(build_svg_specs());
  }
  
  svg_array_index = svg_array.length -1;
  add_svg_to_list(current_svg);
  console.log(svg_array[svg_array_index]);
  group_mode = false;
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
  svg_x = parseFloat(e.target.value) || 0;
  build_svg_group();
};

function group_element_y_changed(e){
  svg_y = parseFloat(e.target.value) || 0;
  build_svg_group();
};

function group_element_scale_changed(e){
  svg_scale = parseFloat(e.target.value) || 1;
  build_svg_group();
};

function group_element_rotation_changed(e){
  svg_rotation = parseInt(e.target.value) || 0;
  build_svg_group();
};
