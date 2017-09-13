// Config

var CONFIG_FRAME_RATE = 60,
  CONFIG_CANVAS_DOM = 'game_canvas';





var CONFIG_SHIP_HEALTH = [250, 15, 23, 33, 50],
  CONFIG_PRIMARY_WEAPON_POWER = [1, 2, 3, 5, 8],
  CONFIG_PRIMARY_WEAPON_ATTACK_SPEED = [5, 3, 5, 7, 10],
  CONFIG_PRIMARY_WEAPON_GRAPHIC = 101, // ammo
  CONFIG_SHIELD_HEALTH = [150, 8, 13, 21, 35],
  CONFIG_SHIELD_DOWN_TIME = [1, 1.25, 1.5, 2, 2.5],
  CONFIG_SHIP_GRAPHIC = 5,


  CONFIG_ENEMY_WEAPON_GRAPHIC = 14,
  // CONFIG_ENEMY_GRAPHICS = [94,  89, 85, 61, 58, 54, 43, 36, 21, 15, 86, 92],
  // CONFIG_ENEMY_RADIUS =   [150, 70, 30, 25, 120,22, 60, 30, 25, 40, 20, 30],
  // CONFIG_ENEMY_X =        [50,  50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
  // CONFIG_ENEMY_Y =        [45,  55, 48, 55, 55, 48, 50, 40, 45, 60, 60, 60],
  // CONFIG_ENEMY_SCALE =    [3,   2,  1,  1,  3,  1,  2,  1,  1,  1,  1,  1],
  // CONFIG_ENEMY_ROTATION = [0,   0,  0,  270,0,  270,270,270,270,0,270,  0],

  // CONFIG_ENEMY_HEALTH = [40,1,1,1,1,1,1,1,1,1,1,1],
  // CONFIG_ENEMY_ATTACK_POWER = [4,1,1,1,1,1,1,1,1,1,1,1],
  CONFIG_ENEMY_BEHAVIOR = [V_Shoot, FlyBy, BigFlyBy, Random_Spot, FlyBy, Decend_1, Round_The_Table, V_Shoot, FlyBy, Random_Spot, Up_And_Down, Decend_2],
  
  CONFIG_ENEMY_WEAPONS =      [0,   1,    2,    1,    1,    3,    1,    1,    1,    2,    0,    3]

  CONFIG_ENEMY_GRAPHICS =     [21,  36,   43,   54,   61,   58,   15,   85,   86,   89,   92,   94],
  CONFIG_ENEMY_RADIUS =       [25,  30,   60,   22,   25,   120,  40,   30,   20,   70,   30,   150],
  CONFIG_ENEMY_X =            [50,  50,   50,   50,   50,   50,   50,   50,   50,   50,   50,   50],
  CONFIG_ENEMY_Y =            [45,  40,   50,   48,   55,   55,   60,   48,   60,   55,   60,   45],
  CONFIG_ENEMY_SCALE =        [1,   1,    2,    1,    1,    3,    1,    1,    1,    2,    1,    3],
  CONFIG_ENEMY_ROTATION =     [270, 270,  270,  0,    270,  0,    0,    0,    270,  0,    0,    0],
  CONFIG_ENEMY_HEALTH =       [2,   2,    4,    1,    1,    10,   2,    1,    1,    4,    1,    20],
  CONFIG_ENEMY_ATTACK_POWER = [1,   1,    2,    1,    1,    3,    2,    1,    2,    2,    1,    4],
  CONFIG_ENEMY_ATTACK_RATE =  [0.5, 0.3,  0.5,  1,    0.10, 0.6,  0.5,  1,    0.1,  0.3,  1,    1],
  CONFIG_ENEMY_SPEED =        [200, 200,  80,   150,  300,  50,   150,  200,  350,  150,  200,  50]










  CONFIG_FOREGROUND_LEVEL_1_TERRAIN = [99,100],
  CONFIG_MIDGROUND_LEVEL_1_TERRAIN = [82,96,95,97,98],
  CONFIG_BACKGROUND_LEVEL_1_TERRAIN = [80],
  CONFIG_FOREGROUND_LEVEL_2_TERRAIN = [null, null, null, '...'],
  CONFIG_MIDGROUND_LEVEL_2_TERRAIN = [null, null, null, '...'],
  CONFIG_BACKGROUND_LEVEL_2_TERRAIN = [null, null, null, '...'],
  CONFIG_FOREGROUND_LEVEL_3_TERRAIN = [null, null, null, '...'],
  CONFIG_MIDGROUND_LEVEL_3_TERRAIN = [null, null, null, '...'],
  CONFIG_BACKGROUND_LEVEL_3_TERRAIN = [null, null, null, '...'],
  CONFIG_FOREGROUND_LEVEL_4_TERRAIN = [null, null, null, '...'],
  CONFIG_MIDGROUND_LEVEL_4_TERRAIN = [null, null, null, '...'],
  CONFIG_BACKGROUND_LEVEL_4_TERRAIN = [null, null, null, '...'],
  CONFIG_FOREGROUND_LEVEL_5_TERRAIN = [null, null, null, '...'],
  CONFIG_MIDGROUND_LEVEL_5_TERRAIN = [null, null, null, '...'],
  CONFIG_BACKGROUND_LEVEL_5_TERRAIN = [null, null, null, '...'],
  CONFIG_ENEMY_GRAPHICS_LEVEL_1 = [21, 36, 43, 54, '(58)'],
  CONFIG_ENEMY_GRAPHICS_LEVEL_2 = [null, null, null, null, '(boss)'],
  CONFIG_ENEMY_GRAPHICS_LEVEL_3 = [null, null, null, null, '(boss)'],
  CONFIG_ENEMY_GRAPHICS_LEVEL_4 = [null, null, null, null, '(boss)'],
  CONFIG_ENEMY_GRAPHICS_LEVEL_5 = [null, null, null, null, '(boss)'],
  CONFIG_ENEMY_PROJECTILE_GRAPHICS_LEVEL_1 = [null, null, null, null, '(boss)', '(boss2'],
  CONFIG_ENEMY_PROJECTILE_GRAPHICS_LEVEL_2 = [null, null, null, null, '(boss)', '(boss2'],
  CONFIG_ENEMY_PROJECTILE_GRAPHICS_LEVEL_3 = [null, null, null, null, '(boss)', '(boss2'],
  CONFIG_ENEMY_PROJECTILE_GRAPHICS_LEVEL_4 = [null, null, null, null, '(boss)', '(boss2'],
  CONFIG_ENEMY_PROJECTILE_GRAPHICS_LEVEL_5 = [null, null, null, null, '(boss)', '(boss2'];
  // Make your own UI elements here, and I will reference them as needed.
  




