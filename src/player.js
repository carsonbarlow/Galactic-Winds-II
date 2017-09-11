// Player

var Player = function(){


  var _this = this;

  var max_health = 10,
  health = 10,
  primary_weapon = new PrimaryWeapon(0),
  auxiliary_weapon = new PrimaryWeapon(0),
  shield = new Shield(0),
  speed = 200,
  vol_x = 0,
  vol_y = 0,
  w_pressed,
  a_pressed,
  s_pressed,
  d_pressed,
  space_pressed;

  this.graphic = new Graphic({
    svg: CONFIG_SHIP_GRAPHIC,
    radius: 30,
    x: 52,
    y: 51,
    rotation: 0,
    scale: 4
  });

  function init(){
    graphics.add_to_manifest(_this.graphic, 'player');
    input.subscribe_to_key('w', w_key);
    input.subscribe_to_key('a', a_key);
    input.subscribe_to_key('s', s_key);
    input.subscribe_to_key('d', d_key);
    input.subscribe_to_key(' ', space_key);
  };

  
  function update(delta){
    vol_x = 0;
    vol_y = 0;
    if (d_pressed){ vol_x += (speed * delta) }
    if (a_pressed){ vol_x -= (speed * delta) }
    if (s_pressed){ vol_y += (speed * delta) }
    if (w_pressed){ vol_y -= (speed * delta) }
    _this.graphic.update_position({x: _this.graphic.pos_x + vol_x, y: _this.graphic.pos_y + vol_y});
  };


  function damage_ship(amount){
    health -= amount;
    check_death();
  };

  function heal_ship(amount){
    health += amount;
    if (health > max_health){
      health = max_health;
    }
  }

  function check_death(){'...'};
  function adminiseter_death(){'...'};


  function upgrade_health(amount){
    max_health = health = amount;
  };

  function fire_primary_weapon(){
    primary_weapon.fire();
  };
  function fire_auxiliary_weapon(){'...'};


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




  this.damage_ship = damage_ship;
  this.heal_ship = heal_ship;
  this.adminiseter_death = adminiseter_death;
  this.fire_primary_weapon = fire_primary_weapon;
  this.fire_auxiliary_weapon = fire_auxiliary_weapon;
  this.init = init;
  this.update = update;

};
