// projectile

var Projectile = function(config){

  this.power = config.power;
  this.vol_x = config.vol_x;
  this.vol_y = config.vol_y;
  this.pos_x;
  this.pos_y;

  this.targets = (config.friendly)? enemy_manager.get_enemy_list() : [player];
  this.source = config.source;


  
  this.graphic = new Graphic({
    svg: config.svg,
    radius: config.radius,
    x: 50,
    y: 50,
    rotation: 0,
    scale: 1
  });

  function init(){
    this.pos_x = this.source.graphic.pos_x;
    this.pos_y = this.source.graphic.pos_y;
    this.graphic.update_position({x: this.pos_x, y: this.pos_y});
    graphics.add_to_manifest(this.graphic, 'projectiles');
  };

  function update(delta){
    this.pos_x += this.vol_x * delta;
    this.pos_y += this.vol_y * delta;
    this.graphic.update_position({x: this.pos_x, y: this.pos_y});

    for (var i = 0; i < this.targets.length; i++){
      if (!this.targets[i].is_dying && utils.collision(this.graphic, this.targets[i].graphic)){
        this.targets[i].damage(this.power);
        graphics.remove_from_manifest(this.graphic, 'projectiles');
        return true;
      }
    }

    if (utils.check_if_off_screen(this.graphic)){
      graphics.remove_from_manifest(this.graphic, 'projectiles');
      return true;
    }
    return false;
  };

  this.init = init;
  this.update = update;

  this.init();

};

