// Primary Weapon

var PrimaryWeapon = function(tier){

  var power = CONFIG_PRIMARY_WEAPON_POWER[tier];
  var attack_speed = CONFIG_PRIMARY_WEAPON_ATTACK_SPEED[tier];
  var cooling_down = false;

  var graphic = null; // make graphic object. (maybe)

  function fire(){
    if (!cooling_down){
      console.log('BANG!');
      cooling_down = true;
      setTimeout(cool_off_weapon, 1000/attack_speed); // this logic will likely change.
    }else{
      console.log( '...' );
    }
  };


  function cool_off_weapon(){
    cooling_down = false;
  };

  this.fire = fire;

};