// level manager

var LevelManager = function(){

  var paralax_manager = new ParalaxManager();


  function init(){
    paralax_manager.init();
  };

  // function build_background(level){
  //   for (var i = 0; i < 4; i++){
  //     var graphic = new Graphic({
  //       svg: CONFIG_BACKGROUND_LEVEL_1_TERRAIN[0],
  //       radius: 0,
  //       x: 50,
  //       y: 50,
  //       rotation: 0,
  //       scale: 6.1
  //     });
  //     graphics.add_to_manifest(graphic, 'background');
  //     background_svgs.push(graphic);
  //     background_svgs_pos_x.push(i*600);
  //   }
  // };

 


  function update(delta){
    paralax_manager.update(delta);
  };


  // function update_background(delta){
  //   for (var i = 0; i < background_svgs_pos_x.length; i++){
  //     background_svgs_pos_x[i] -= (20 * delta);
  //     if (background_svgs_pos_x[i] < -300){
  //       background_svgs_pos_x[i] += 2400;
  //     }
  //     background_svgs[i].update_position({x: background_svgs_pos_x[i], y: background_y})
  //   }
  // };

  // function update_midground(delta){
  //   for (var i = 0; i < background_svgs_pos_x.length; i++){
  //     background_svgs_pos_x[i] -= (20 * delta);
  //     if (background_svgs_pos_x[i] < -300){
  //       background_svgs_pos_x[i] += 2400;
  //     }
  //     background_svgs[i].update_position({x: background_svgs_pos_x[i], y: background_y})
  //   }
  // };













  this.init = init;
  this.update = update;

};