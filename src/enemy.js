// enemy

var Enemy = function(type){
  this.max_health = CONFIG_ENEMY_HEALTH[type];
  this.health = this.max_health;
  this.attack_power = CONFIG_ENEMY_ATTACK_POWER[type];

  this.graphic = new Graphic({
    svg: CONFIG_ENEMY_GRAPHICS[type],
    radius: CONFIG_ENEMY_RADIUS[type],
    x: CONFIG_ENEMY_X[type],
    y: CONFIG_ENEMY_Y[type],
    rotation: CONFIG_ENEMY_ROTATION[type],
    scale: CONFIG_ENEMY_SCALE[type]
  });

  this.pos_x;
  this.pos_y;
  this.vol_x;
  this.vol_y;
  this.is_dying = false;
  this.behavior = CONFIG_ENEMY_BEHAVIOR[type];
  this.speed = CONFIG_ENEMY_SPEED[type];

  function init(){
    this.behavior.init.apply(this);
    graphics.add_to_manifest(this.graphic, 'enemies');
    this.weapon = new EnemyWeapon({
      power: CONFIG_ENEMY_ATTACK_POWER[type],
      attack_speed: CONFIG_ENEMY_ATTACK_RATE[type],
      source: this,
      fire_function: CONFIG_ENEMY_WEAPONS[type]});
  };

  function update(delta){
    this.behavior.update.apply(this, [delta]);
    this.weapon.update(delta);
    this.graphic.update_position({x: this.pos_x, y: this.pos_y});
  };

  function damage(amount){
    this.health -= amount;
    if (this.health < 1){
      this.is_dying = true;
      this.behavior = Dying;
    }
  };
  
  this.init = init;
  this.update = update;
  this.damage = damage;

  this.init();
};