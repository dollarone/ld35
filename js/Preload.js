var PlatformerGame = PlatformerGame || {};

//loading the game assets
PlatformerGame.Preload = function(){};

PlatformerGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.game.load.spritesheet('logo-tiles', 'assets/gfx/logo-tiles.png', 17, 16);
    this.game.load.image('track_vertical', 'assets/track_vertical.png');
    this.game.load.image('track_horizontal', 'assets/track_horizontal.png');
    this.game.load.image('track_south_east', 'assets/track_south_east.png');
    this.game.load.image('track_south_west', 'assets/track_south_west.png');
    this.game.load.image('track_north_east', 'assets/track_north_east.png');
    this.game.load.image('track_north_west', 'assets/track_north_west.png');
    this.game.load.image('track_cross', 'assets/track_cross.png');
    this.game.load.image('empty', 'assets/empty.png');
    this.game.load.image('grass', 'assets/grass.png');
    this.game.load.image('mountain', 'assets/mountain.png');
    this.game.load.image('train_blue', 'assets/train_blue.png');
    this.game.load.image('train_red', 'assets/train_red.png');
    this.game.load.image('train_yellow', 'assets/train_yellow.png');
    this.game.load.image('train_green', 'assets/train_green.png');
    this.game.load.image('track_station_red_facing_south', 'assets/track_station_red_facing_south.png');
    this.game.load.image('track_station_red_facing_north', 'assets/track_station_red_facing_north.png');
    this.game.load.image('track_station_red_facing_west', 'assets/track_station_red_facing_west.png');
    this.game.load.image('track_station_red_facing_east', 'assets/track_station_red_facing_east.png');
    this.game.load.image('track_station_blue_facing_south', 'assets/track_station_blue_facing_south.png');
    this.game.load.image('track_station_blue_facing_north', 'assets/track_station_blue_facing_north.png');
    this.game.load.image('track_station_blue_facing_west', 'assets/track_station_blue_facing_west.png');
    this.game.load.image('track_station_blue_facing_east', 'assets/track_station_blue_facing_east.png');
    this.game.load.image('track_station_yellow_facing_south', 'assets/track_station_yellow_facing_south.png');
    this.game.load.image('track_station_yellow_facing_north', 'assets/track_station_yellow_facing_north.png');
    this.game.load.image('track_station_yellow_facing_west', 'assets/track_station_yellow_facing_west.png');
    this.game.load.image('track_station_yellow_facing_east', 'assets/track_station_yellow_facing_east.png');
    this.game.load.image('track_station_green_facing_south', 'assets/track_station_green_facing_south.png');
    this.game.load.image('track_station_green_facing_north', 'assets/track_station_green_facing_north.png');
    this.game.load.image('track_station_green_facing_west', 'assets/track_station_green_facing_west.png');
    this.game.load.image('track_station_green_facing_east', 'assets/track_station_green_facing_east.png');

    this.game.load.spritesheet('reset_button', 'assets/reset_button.png', 64, 32);
    this.game.load.spritesheet('next_button', 'assets/next_button.png', 64, 32);

    this.game.load.spritesheet('pete', 'assets/gfx/pete.png', 32, 32);
    this.game.load.spritesheet('tiles', 'assets/gfx/tiles.png', 32, 32);

    this.game.load.text('level1', 'assets/levels/level1');
    this.game.load.text('level2', 'assets/levels/level2');
    this.game.load.text('level3', 'assets/levels/level3');
    this.game.load.text('level4', 'assets/levels/level4');
    this.game.load.text('level5', 'assets/levels/level5');
    this.game.load.text('level6', 'assets/levels/level6');
    this.game.load.text('level7', 'assets/levels/level7');
    this.game.load.text('level8', 'assets/levels/level8');
    this.game.load.text('level9', 'assets/levels/level9');
    this.game.load.text('level10', 'assets/levels/level10');


    this.game.load.audio('music', 'assets/sfx/ld35.ogg');
    this.game.load.audio('pleaseshift', 'assets/sfx/pleaseshift.ogg');
    this.game.load.audio('ooh', 'assets/sfx/ooh.ogg');
    this.game.load.audio('lvl1', 'assets/sfx/lvl1.ogg');
    this.game.load.audio('lvl2', 'assets/sfx/lvl2.ogg');
    this.game.load.audio('lvl3', 'assets/sfx/lvl3.ogg');
    this.game.load.audio('kremt', 'assets/sfx/kremt.ogg');
    this.game.load.audio('hurry', 'assets/sfx/hurry.ogg');
    this.game.load.audio('helpful', 'assets/sfx/helpful.ogg');
    this.game.load.audio('goodwork', 'assets/sfx/goodwork.ogg');
    this.game.load.audio('funny', 'assets/sfx/funny.ogg');
    this.game.load.audio('find', 'assets/sfx/find.ogg');
    this.game.load.audio('failure', 'assets/sfx/failure.ogg');
    this.game.load.audio('excellent', 'assets/sfx/excellent.ogg');
    this.game.load.audio('champ', 'assets/sfx/champ.ogg');
    this.game.load.audio('welldone', 'assets/sfx/welldone.ogg');
    this.game.load.audio('toot', 'assets/sfx/toot.ogg');
    this.game.load.audio('speed', 'assets/sfx/speed.ogg');
    this.game.load.audio('so', 'assets/sfx/so.ogg');


  },
  create: function() {
    this.state.start('Logo');
  }
};
