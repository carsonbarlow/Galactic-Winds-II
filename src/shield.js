// shield

var Shield = function(tier){

  var max_health = CONFIG_SHIELD_HEALTH[tier],
    health = max_health,
    recharge_delay = 5000 / CONFIG_SHIELD_DOWN_TIME[tier],
    recharge_timer,
    recharge_interval;

  function damage(amount){
    var damage_overflow = 0;
    health -= amount;
    if (health < 0){
      damage_overflow = -health;
      health = 0;
    }
    console.log( "shield health:", health );
    clearInterval(recharge_interval);
    clearTimeout(recharge_timer);
    recharge_timer = setTimeout(shart_recharging, recharge_delay);
    return damage_overflow;
  }

  function shart_recharging(){
    recharge_interval = setInterval(recharge_shield, 5000/max_health);
  };

  function recharge_shield(){
    health++;
    if (health == max_health){
      clearInterval(recharge_interval);
    }
  };

  function health_percentage(){
    return health / max_health;
  }

  this.damage = damage;
  this.health_percentage = health_percentage;

};
