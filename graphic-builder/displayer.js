// Display

var Displayer = function(){


  var main_display,
    list_display,
    svg_index;

  function assign_main_display(display){
    main_display = display;
  };

  function assign_list_display(display){
    list_display = display;
  };

  function assign_svg_index(display){
    svg_index = display;
  };

  function display_svg(svg){
    main_display.innerHTML = wrap_into_svg(svg);
    var selected_list_item = document.getElementsByClassName('selected');
    if (selected_list_item[0]){
      selected_list_item[0].innerHTML = wrap_into_svg(svg);
    }
  };

  function wrap_into_svg(svg){
    return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 50 50" xml:space="preserve">'+svg+'</svg>';
  };

  function add_svg_to_list(shape){
    deselect_svg_div();
    var svg = wrap_into_svg(shape.build_svg());
    var svg_div = document.createElement('div');
    svg_div.classList.add('svg_list_div');
    svg_div.classList.add('selected');
    svg_div.innerHTML = svg;
    svg_div.addEventListener('click', svg_div_clicked);
    list_display.appendChild(svg_div);
  };

  function svg_div_clicked(e){
    if (add_svg_mode){
      add_svg_mode = false;
      var svg_list_children = svg_list.childNodes;
      for (i = 0; i < svg_list_children.length; i++){
        if (svg_list_children[i] == this){
          shapeBuilder.add_shape_to_group(i);
        }
      }
      return;
    }
    deselect_svg_div();
    this.classList.add('selected');
    var svg_list_children = svg_list.childNodes;
    for (i = 0; i < svg_list_children.length; i++){
      if (svg_list_children[i] == this){
        display_svg(shapeBuilder.get_shape(i).build_svg());
        input.update_input(shapeBuilder.get_shape(i).stats);
        shapeBuilder.select_shape(i);

        svg_index.innerHTML = 'SVG Index: ' + i;
      }
    }
  }

  function select_svg_div(index){
    deselect_svg_div();
    svg_list.childNodes[index].classList.add('selected');
    display_svg(shapeBuilder.get_shape(index).build_svg());
    console.log( "svg_index:", svg_index );
    console.log( "index:", index );
  };

  function deselect_svg_div(){
    div_deselected = false;
    var current_selected = document.getElementsByClassName('selected');
    for (var i = 0; i < current_selected.length; i++){
      current_selected[i].classList.remove('selected');
      div_deselected = true;
    }
    return div_deselected;
  }

  function delete_svg(index){
    svg_list.removeChild(svg_list.childNodes[index]);
  };



  this.assign_main_display = assign_main_display;
  this.assign_list_display = assign_list_display;
  this.assign_svg_index = assign_svg_index;
  this.display_svg = display_svg;
  this.add_svg_to_list = add_svg_to_list;
  this.delete_svg = delete_svg;
  this.select_svg_div = select_svg_div;


};


var displayer = new Displayer();