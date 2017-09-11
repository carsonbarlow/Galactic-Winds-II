// renders game objects onto canvas

var DOMURL = window.URL || window.webkitURL || window;

var Graphics = function () {

  var draw_manifest = {
    background: [],
    midground: [],
    enemies: [],
    player: [],
    projectiles: [],
    foreground: []
  },
  draw_order = ['background', 'midground', 'enemies', 'projectiles', 'player', 'foreground'];

  var canvas = document.getElementById(CONFIG_CANVAS_DOM),
    ctx = canvas.getContext('2d'),
    CANVAS_WIDTH = canvas.width,
    CANVAS_HEIGHT = canvas.height,
    avatar;


  function draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (var list = 0; list < draw_order.length; list++){
      draw_manifest_list(draw_order[list]);
    }
    ctx.beginPath();
    ctx.rect(0,0,CANVAS_WIDTH,75);
    ctx.fillStyle = 'rgba(210,210,50,0.5)';
    ctx.fill();
    ctx.beginPath();
    ctx.rect(400, 400, 10, 10);
    ctx.fill();

  }

  function add_to_manifest(item, type){
    var list = draw_manifest[type];
    if (list.indexOf(item) == -1){
      list.push(item);
    }
  }

  function remove_from_manifest(item, type){
    var list = draw_manifest[type];
    if (list.indexOf(item) != -1){
      list.splice(list.indexOf(item),1);
    }
  }

  function draw_manifest_list(name){
    var list = draw_manifest[name];
    
      // console.log( name );
      // console.log( draw_manifest[name]);
    
    for (var i = 0; i < list.length; i++){
      var g = list[i];
      ctx.drawImage(g.svg, g.render_x, g.render_y, 100 * g.scale, 100 * g.scale);
      ctx.beginPath();
      ctx.strokeStyle = 'rgb(210,210,210)';
      ctx.arc(g.pos_x, g.pos_y, g.radius, 0, Math.PI * 2, true);
      ctx.stroke();
    }
    
  }


  this.draw = draw;
  this.add_to_manifest = add_to_manifest;
  this.remove_from_manifest = remove_from_manifest;

};

