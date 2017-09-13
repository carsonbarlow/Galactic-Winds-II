// renders game objects onto canvas

var DOMURL = window.URL || window.webkitURL || window,
  CANVAS_WIDTH,
  CANVAS_HEIGHT;

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
    avatar;
  ctx.font = "30px Arial";
  CANVAS_WIDTH = canvas.width;
  CANVAS_HEIGHT = canvas.height;


  function draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (var list = 0; list < draw_order.length; list++){
      draw_manifest_list(draw_order[list]);
    }
    ctx.beginPath();
    ctx.rect(0,0,CANVAS_WIDTH,75);
    ctx.fillStyle = 'rgb(50,70,120)';
    ctx.fill();
    ctx.fillStyle = 'rgb(220,220,220)';
    ctx.fillText("Ship Health:",60,45);
    ctx.beginPath();
    ctx.fillStyle = 'rgb(180,180,250)';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgb(180,180,250)';
    ctx.rect(247, 17, 506 * player.shield_percentage(), 36);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.fillStyle = 'rgb(50,50,50)';
    ctx.rect(250, 20, 500, 30);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'rgb(200,0,0)';
    ctx.rect(250, 20, 500 * player.health_percentage(), 30);
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
    
    for (var i = 0; i < list.length; i++){
      var g = list[i];
      ctx.save();
      ctx.translate(g.pos_x,g.pos_y);
      ctx.rotate((g.rotation/2) * 1.570796327);
      ctx.translate(-g.pos_x,-g.pos_y);
      ctx.drawImage(g.svg, g.render_x, g.render_y, 100 * g.scale, 100 * g.scale);
      ctx.restore();

      ctx.beginPath();
      ctx.strokeStyle = 'rgb(210,210,210)';
      ctx.arc(g.pos_x, g.pos_y, g.radius, 0, Math.PI * 2, true);
      ctx.stroke();

      if (name == 'projectiles'){
        // console.log( "list:", list[i] );
      }
    }
    
  }

  this.draw = draw;
  this.add_to_manifest = add_to_manifest;
  this.remove_from_manifest = remove_from_manifest;

};
