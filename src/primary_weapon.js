// Primary Weapon

var PrimaryWeapon = function(tier){

  var power = CONFIG_PRIMARY_WEAPON_POWER[tier];
  var attack_speed = CONFIG_PRIMARY_WEAPON_ATTACK_SPEED[tier];
  var cooling_down = false;

  var projectiles_in_flight = [];

  var projectile_config = {
    svg: CONFIG_PRIMARY_WEAPON_GRAPHIC,
    power: 1,
    vol_x: 500,
    vol_y: 0,
    radius: 15,
    friendly: true,
    source: player
  };

  function fire(){
    if (!cooling_down){
      // console.log('BANG!');
      cooling_down = true;
      setTimeout(cool_off_weapon, 1000/attack_speed);
      projectiles_in_flight.push(new Projectile(projectile_config));

    }else{
      // console.log( '...' );
    }
  };

  function update(delta){
    for (var i = projectiles_in_flight.length -1; i > -1 ; i--){
      if (projectiles_in_flight[i].update(delta)){
        projectiles_in_flight.splice(i, 1);
      }
    }
  }


  function cool_off_weapon(){
    cooling_down = false;
  };

  this.fire = fire;
  this.update = update;

};