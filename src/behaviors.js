// move behaviors

var FirstContact = {
  init: function(){
    this.pos_x = 1350;
    this.pos_y = 300;
    this.vol_x = -160;
    this.vol_y = 0;
  },
  update: function(delta){
    this.pos_x += this.vol_x * delta;
    this.pos_y += this.vol_y * delta;
    if (this.pos_x < 550){
      this.vol_x = 0;
    }

    this.weapon.fire();
  }
};  

var Dying = {
  update: function(delta){
    this.vol_y += (500 * delta);
    this.pos_x += this.vol_x * delta;
    this.pos_y += this.vol_y * delta;
  }
};

var FlyBy = {
  init: function(){
    this.pos_x = 1350;
    this.pos_y = parseInt(Math.random()* 500) + 150;
    this.vol_x = -this.speed;
    this.vol_y = 0;
  },
  update: function(delta){
    this.pos_x += this.vol_x * delta;
    this.pos_y += this.vol_y * delta;
    if (this.pos_x < -this.speed){
      this.vol_x = 0;
      this.behavior = Dying;
    }
    if (this.pos_x < player.graphic.pos_x){
      this.weapon.fire();
    }
  }
};

var BigFlyBy = {
  init: function(){
    this.pos_x = 1350;
    this.pos_y = parseInt(Math.random()* 500) + 150;
    this.vol_x = -this.speed;
    this.vol_y = 0;
  },
  update: function(delta){
    this.pos_x += this.vol_x * delta;
    this.pos_y += this.vol_y * delta;
    if (this.pos_x < -this.speed){
      this.vol_x = 0;
      this.behavior = Dying;
    }
    this.weapon.fire();
  }
};

var V_Shoot = {
  init: function(){
    this.pos_x = 1350;
    this.pos_y = 700;
    this.vol_x = -this.speed/2;
    this.vol_y = -this.speed;
    this.going_up = true;
  },
  update: function(delta){
    this.pos_x += this.vol_x * delta;
    this.pos_y += this.vol_y * delta;
    if (this.pos_x < -this.speed){
      this.vol_x = 0;
    }
    if (this.going_up && utils.check_if_in_bounds(this.graphic).indexOf('top') > -1){
      this.vol_y = this.speed;
      this.going_up = false;
    }else if(!this.going_up && utils.check_if_in_bounds(this.graphic).indexOf('bottom') > -1){
      this.vol_y = -this.speed;
      this.going_up = true;
    }
    this.weapon.fire();
  }
};

var Random_Spot = {
  init: function(){
    this.pos_x = 1350;
    this.pos_y = parseInt(Math.random()* 500) + 150;
    this.moving = false;
    this.delay_time = 1.0;
  },
  update: function(delta){
    if (this.moving){
      this.pos_x += this.vol_x * delta;
      this.pos_y += this.vol_y * delta;
      if (Math.abs(this.pos_x - this.destination_x) < 10 || Math.abs(this.pos_y - this.destination_y) < 10){
        this.moving = false;
        this.delay_time = 1;
      }
    }else{
      this.delay_time -= delta;
      if (this.delay_time < 0){
        this.destination_x = parseInt(Math.random() * (CANVAS_WIDTH - 150 - this.graphic.radius) + (100 + this.graphic.radius));
        this.destination_y = parseInt(Math.random() * (CANVAS_HEIGHT - 150 - this.graphic.radius) + (150 + this.graphic.radius));
        var normals = utils.normalize(this.pos_x, this.pos_y, this.destination_x, this.destination_y);
        this.vol_x = normals[0] * this.speed;
        this.vol_y = normals[1] * this.speed;
        this.moving = true;
      }
    }
    this.weapon.fire();
  }
};

var Decend_1 = {
  init: function(){
    this.pos_x = 300;
    this.pos_y = -200;
    this.vol_x = 0;
    this.vol_y = this.speed;
    this.moving = true;
  },
  update: function(delta){
    if (this.moving){
      this.pos_y += this.vol_y * delta;
      if (this.pos_y > 225){
        this.moving = false;
      }
    }else{
      this.weapon.fire();
    }
  }
};


var Decend_2 = {
  init: function(){
    this.pos_x = 900;
    this.pos_y = -200;
    this.vol_x = 0;
    this.vol_y = this.speed;
    this.moving = true;
  },
  update: function(delta){
    if (this.moving){
      this.pos_y += this.vol_y * delta;
      if (this.pos_y > 225){
        this.moving = false;
      }
    }else{
      this.weapon.fire();
    }
  }
};

var Round_The_Table = {
  init: function(){
    this.pos_x = 1350;
    this.pos_y = 200;
    this.vol_x = -this.speed;
    this.vol_y = 0;
    this.direction = 'left';
  },
  update: function(delta){
    if (this.direction == 'left'){
      if (utils.check_if_in_bounds(this.graphic).indexOf('left') > -1){
        this.direction = 'down';
        this.vol_x = 0;
        this.vol_y = this.speed;
      }
    }else if(this.direction == 'down'){
      if (utils.check_if_in_bounds(this.graphic).indexOf('bottom') > -1){
        this.direction = 'right';
        this.vol_x = this.speed;
        this.vol_y = 0;
      }
    }else if(this.direction == 'right'){
      if (utils.check_if_in_bounds(this.graphic).indexOf('right') > -1){
        this.direction = 'up';
        this.vol_x = 0;
        this.vol_y = -this.speed;
      }
    }else if(this.direction == 'up'){
      if (utils.check_if_in_bounds(this.graphic).indexOf('top') > -1){
        this.direction = 'left';
        this.vol_x = -this.speed;
        this.vol_y = 0;
      }
    }
    this.pos_x += this.vol_x * delta;
    this.pos_y += this.vol_y * delta;
    this.weapon.fire();
  }
};

var Up_And_Down = {
  init: function(){
    this.pos_x = 1350;
    this.pos_y = parseInt(Math.random()* 500) + 150;
    this.vol_x = -this.speed;
    this.vol_y = 0;
    this.direction = 'left';
  },
  update: function(delta){
    if (this.direction == 'left'){
      if (this.pos_x < 1100){
        this.vol_x = 0;
        this.vol_y = -this.speed;
        this.direction = 'up';
      }
    }else if(this.direction == 'up'){
      if (utils.check_if_in_bounds(this.graphic).indexOf('top') > -1){
        this.direction = 'down';
        this.vol_y = this.speed;
      }
    }else if(this.direction == 'down'){
      if (utils.check_if_in_bounds(this.graphic).indexOf('bottom') > -1){
        this.direction = 'up';
        this.vol_y = -this.speed;
      }
    }
    if (this.direction != 'left'){
      this.weapon.fire();
    }
    this.pos_x += this.vol_x * delta;
    this.pos_y += this.vol_y * delta;
  }
};
