// Player

var Player = function(){

  var max_health = 10,
  health = 10,
  primary_weapon = new PrimaryWeapon(0),
  auxiliary_weapon = new PrimaryWeapon(0),
  shield = null; // make sheild?

  this.graphic = null; // make graphic object

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

  this.damage_ship = damage_ship;
  this.heal_ship = heal_ship;
  this.adminiseter_death = adminiseter_death;
  this.fire_primary_weapon = fire_primary_weapon;
  this.fire_auxiliary_weapon = fire_auxiliary_weapon;

};


var player = new Player();