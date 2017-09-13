// Player

var Player = function(){


  var _this = this;

  var max_health = 15,
  health = 15,
  primary_weapon,
  shield = new Shield(0),
  speed = 200,
  vol_x = 0,
  vol_y = 0,
  w_pressed,
  a_pressed,
  s_pressed,
  d_pressed,
  space_pressed,
  is_dying = false;

  this.graphic = new Graphic({
    svg: CONFIG_SHIP_GRAPHIC,
    radius: 30,
    x: 45,
    y: 50,
    rotation: 0,
    scale: 1
  });

  function init(){
    primary_weapon = new PrimaryWeapon(0);
    graphics.add_to_manifest(_this.graphic, 'player');
    input.subscribe_to_key('w', w_key);
    input.subscribe_to_key('a', a_key);
    input.subscribe_to_key('s', s_key);
    input.subscribe_to_key('d', d_key);
    input.subscribe_to_key(' ', space_key);
  };

  function update(delta){
    if (is_dying){
      // console.log( "delta:", delta );
      vol_y += (9.8 * delta);
      _this.graphic.update_position({x: _this.graphic.pos_x + vol_x, y: _this.graphic.pos_y + vol_y});
      if (_this.graphic.pos_y > 900){
        game_paused = true;
        progress_game(true);
      }
      return;
    }
    vol_x = 0;
    vol_y = 0;
    var constraints = utils.check_if_in_bounds(_this.graphic);
    if (d_pressed && constraints.indexOf('right') == -1){ vol_x += (speed * delta) }
    if (a_pressed && constraints.indexOf('left') == -1){ vol_x -= (speed * delta) }
    if (s_pressed && constraints.indexOf('bottom') == -1){ vol_y += (speed * delta) }
    if (w_pressed && constraints.indexOf('top') == -1){ vol_y -= (speed * delta) }

    _this.graphic.update_position({x: _this.graphic.pos_x + vol_x, y: _this.graphic.pos_y + vol_y});
    if (space_pressed){fire_primary_weapon();}
    primary_weapon.update(delta);
    // console.log( "_this.graphic.pos_y:", _this.graphic.pos_y );

  };


  function damage(amount){
    health -= shield.damage(amount);
    console.log( "health:", health );
    check_death();
  };

  function heal_ship(amount){
    health += amount;
    if (health > max_health){
      health = max_health;
    }
  }

  function check_death(){
    if (health < 1){
      is_dying = true;
    }
  };


  function upgrade_health(amount){
    max_health = health = amount;
  };

  function fire_primary_weapon(){
    primary_weapon.fire();
  };

  function w_key(pressed){
    if (pressed){
      w_pressed = true;
    }else{
      w_pressed = false;
    }
  }

  function a_key(pressed){
    if (pressed){
      a_pressed = true;
    }else{
      a_pressed = false;
    }
  }

  function s_key(pressed){
    if (pressed){
      s_pressed = true;
    }else{
      s_pressed = false;
    }
  }

  function d_key(pressed){
    if (pressed){
      d_pressed = true;
    }else{
      d_pressed = false;
    }
  }

  function space_key(pressed){
    if (pressed){
      space_pressed = true;
    }else{
      space_pressed = false;
    }
  }

  function health_percentage(){
    return health / max_health;
  }

  function shield_percentage(){
    return shield.health_percentage();
  }




  this.damage = damage;
  this.heal_ship = heal_ship;
  this.fire_primary_weapon = fire_primary_weapon;
  this.init = init;
  this.update = update;
  this.health_percentage = health_percentage;
  this.shield_percentage = shield_percentage;

};
