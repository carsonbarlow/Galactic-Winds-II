// Auxiliary Weapon

var EnemyWeapon = function(config){

      this.power = config.power;
      this.attack_speed = config.attack_speed;
      this.cooling_down = false;
      this.projectiles_in_flight = [];
      var fire_functions = [
        fire_ahead,
        fire_at_player,
        spread_ahead,
        spread_below
      ];
      this.current_fire_function = fire_functions[config.fire_function];
      this.source = config.source;

      var projectile_config = {
        svg: CONFIG_ENEMY_WEAPON_GRAPHIC,
        power: config.power,
        vol_x: 0,
        vol_y: 0,
        radius: 15,
        friendly: false,
        source: this.source
      };

      function fire_ahead(){
        projectile_config.vol_x = -500;
        projectile_config.vol_y = 0;
        this.projectiles_in_flight.push(new Projectile(projectile_config));
      };

      function fire_at_player(){
        var normalized = utils.normalize(player.graphic.pos_x, player.graphic.pos_y, this.source.pos_x, this.source.pos_y);
        projectile_config.vol_x = normalized[0] * -500;
        projectile_config.vol_y = normalized[1] * -500;
        this.projectiles_in_flight.push(new Projectile(projectile_config));
      };

      function spread_ahead(){
        projectile_config.vol_x = -400;
        projectile_config.vol_y = 200;
        this.projectiles_in_flight.push(new Projectile(projectile_config));
        projectile_config.vol_y = 100;
        this.projectiles_in_flight.push(new Projectile(projectile_config));
        projectile_config.vol_y = 0;
        this.projectiles_in_flight.push(new Projectile(projectile_config));
        projectile_config.vol_y = -100;
        this.projectiles_in_flight.push(new Projectile(projectile_config));
        projectile_config.vol_y = -200;
        this.projectiles_in_flight.push(new Projectile(projectile_config));
      };

      function spread_below(){
        projectile_config.vol_y = 400;
        projectile_config.vol_x = 200;
        this.projectiles_in_flight.push(new Projectile(projectile_config));
        projectile_config.vol_x = 100;
        this.projectiles_in_flight.push(new Projectile(projectile_config));
        projectile_config.vol_x = 0;
        this.projectiles_in_flight.push(new Projectile(projectile_config));
        projectile_config.vol_x = -100;
        this.projectiles_in_flight.push(new Projectile(projectile_config));
        projectile_config.vol_x = -200;
        this.projectiles_in_flight.push(new Projectile(projectile_config));
      };

      function fire(){
        if (!this.cooling_down){
          this.cooling_down = true;
          this.current_fire_function();
          setTimeout(cool_off_weapon, 1000/this.attack_speed);
        }
      };
    
      function cool_off_weapon(){
        this.cooling_down = false;
      };

      function update(delta){
        for (var i = this.projectiles_in_flight.length -1; i > -1 ; i--){
          if (this.projectiles_in_flight[i].update(delta)){
            this.projectiles_in_flight.splice(i, 1);
          }
        }
      }
    
      this.fire = fire;
      this.update = update;


};