var PlatformerGame = PlatformerGame || {};

//loading the game assets
PlatformerGame.Preload = function(){};

PlatformerGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.game.load.spritesheet('logo-tiles', 'assets/logo-tiles.png', 17, 16);
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

    this.game.load.spritesheet('pete', 'assets/pete.png', 32, 32);

    this.game.load.text('level1', 'assets/levels/level1');
    this.game.load.text('level2', 'assets/levels/level2');
    this.game.load.text('level3', 'assets/levels/level3');
    this.game.load.text('level4', 'assets/levels/level4');
    this.game.load.text('level5', 'assets/levels/level5');
    this.game.load.text('level6', 'assets/levels/level6');
  },
  create: function() {
    this.state.start('Game');
  }
};
