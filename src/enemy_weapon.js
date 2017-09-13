// Auxiliary Weapon

var EnemyWeapon = function(config){

  return (function(config){
      var power = config.power;
      var attack_speed = config.attack_speed;
      var cooling_down = false;
      var projectiles_in_flight = [];
      var fire_functions = [
        fire_ahead,
        fire_at_player,
        spread_ahead,
        spread_below
      ];
      var current_fire_function = fire_functions[config.fire_function];
      var source = config.source;

      var projectile_config = {
        svg: CONFIG_ENEMY_WEAPON_GRAPHIC,
        power: config.power,
        vol_x: 0,
        vol_y: 0,
        radius: 15,
        friendly: false,
        source: source
      };

      function fire_ahead(){
        projectile_config.vol_x = -500;
        projectile_config.vol_y = 0;
        projectiles_in_flight.push(new Projectile(projectile_config));
      };

      function fire_at_player(){
        var normalized = utils.normalize(player.graphic.pos_x, player.graphic.pos_y, source.pos_x, source.pos_y);
        projectile_config.vol_x = normalized[0] * -500;
        projectile_config.vol_y = normalized[1] * -500;
        projectiles_in_flight.push(new Projectile(projectile_config));
      };

      function spread_ahead(){
        projectile_config.vol_x = -400;
        projectile_config.vol_y = 200;
        projectiles_in_flight.push(new Projectile(projectile_config));
        projectile_config.vol_y = 100;
        projectiles_in_flight.push(new Projectile(projectile_config));
        projectile_config.vol_y = 0;
        projectiles_in_flight.push(new Projectile(projectile_config));
        projectile_config.vol_y = -100;
        projectiles_in_flight.push(new Projectile(projectile_config));
        projectile_config.vol_y = -200;
        projectiles_in_flight.push(new Projectile(projectile_config));
      };

      function spread_below(){
        projectile_config.vol_y = 400;
        projectile_config.vol_x = 200;
        projectiles_in_flight.push(new Projectile(projectile_config));
        projectile_config.vol_x = 100;
        projectiles_in_flight.push(new Projectile(projectile_config));
        projectile_config.vol_x = 0;
        projectiles_in_flight.push(new Projectile(projectile_config));
        projectile_config.vol_x = -100;
        projectiles_in_flight.push(new Projectile(projectile_config));
        projectile_config.vol_x = -200;
        projectiles_in_flight.push(new Projectile(projectile_config));
      };

      function fire(){
        if (!cooling_down){
          cooling_down = true;
          current_fire_function();
          setTimeout(cool_off_weapon, 1000/attack_speed);
        }
      };
    
      function cool_off_weapon(){
        cooling_down = false;
      };

      function update(delta){
        for (var i = projectiles_in_flight.length -1; i > -1 ; i--){
          if (projectiles_in_flight[i].update(delta)){
            projectiles_in_flight.splice(i, 1);
          }
        }
      }
    
      this.fire = fire;
      this.update = update;

      return this;

    })(config);

};