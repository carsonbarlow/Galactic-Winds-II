// shield

var Shield = function(teir){

  var max_health = CONFIG_SHIELD_HEALTH[tier],
    health = max_health,
    recharge_delay = 5000 / CONFIG_SHIELD_DOWN_TIME[tier];


  function damage_shield(amount){
    var damage_overflow = 0;
    health -= amount;
    if (health < 0){
      damage_overflow = -health;
      health = 0;
    }
    // set/reset timer for recharge
    return damage_overflow;
  }


  this.damage_shield = damage_shield;

};