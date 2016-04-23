var PlatfomerGame = PlatformerGame || {};

//title screen
PlatformerGame.Game = function(){};

PlatformerGame.Game.prototype = {
  create: function() {

    this.game.stage.backgroundColor = "#000";
    this.so = true;
    this.score = 0;
    this.scoreText;
    this.gamewon = false;

    this.timerTimeout = 100;
    // The player and its settings
    this.playerGroup = this.game.add.group();

    this.tiles = new Array(10);
    this.tilesGroup = this.game.add.group();
    this.trainGroup = this.game.add.group();
    this.smokeGroup = this.game.add.group();

    this.currentlyPlaying = null;

    this.startGridX = 90;
    this.startGridY = 90;

    this.trainColours = ["none", "red", "blue", "yellow", "green"];
    this.scale = 1;
    this.timer = 0;

    this.titleText = this.game.add.text(250, 10, 'Railroad Shifter', { font: '32px Arial', fill: '#e22' });
    this.errorText = this.game.add.text(180, 530, '', { font: '24px Arial', fill: '#e22' });
    this.levelText = this.game.add.text(650, 55, '', { font: '16px Arial', fill: '#e22' });
    this.goalsText = this.game.add.text(650, 65, '', { font: '16px', fill: '#e22' });
    this.goalsText.lineSpacing = -9;
    this.timeSpent = 0;
    this.timeText = this.game.add.text(650, 325, 'Time: ' + this.timeSpent, { font: '16px Arial', fill: '#e22' });
    this.score = 0;
    this.scoreText = this.game.add.text(650, 345, 'Number of moves: ' + this.score, { font: '16px Arial', fill: '#e22' });

    this.reset_button = this.game.add.sprite(676, 13, 'reset_button');
    this.next_button = this.game.add.sprite(800, 13, 'next_button');
    this.next_button.frame = 2;

    this.levels = ["none", "level1", "level2", "level3", "level4", "level5", "level6", "level7", "level8", "level9", "level10"];
    this.level = 1;

    this.firstTime = true;

    this.music = this.game.add.audio('music');
    this.music.volume = 0.7;
    this.sfx_toot = this.game.add.audio('toot');
    this.sfx_lvl1 = this.game.add.audio('lvl1');
    this.sfx_lvl2 = this.game.add.audio('lvl2');
    this.sfx_lvl3 = this.game.add.audio('lvl3');
    this.sfx_lvl = this.game.add.audio('champ');

    this.sfx_ooh = this.game.add.audio('ooh');
    this.sfx_pleaseshift = this.game.add.audio('pleaseshift');
    this.sfx_kremt = this.game.add.audio('kremt');
    this.sfx_hurry = this.game.add.audio('hurry');
    this.sfx_helpful = this.game.add.audio('helpful');
    this.sfx_goodwork = this.game.add.audio('goodwork');
    this.sfx_funny = this.game.add.audio('funny');
    this.sfx_find = this.game.add.audio('find');
    this.sfx_failure = this.game.add.audio('failure');
    this.sfx_excellent = this.game.add.audio('excellent');
    this.sfx_welldone = this.game.add.audio('welldone');
    this.sfx_speed = this.game.add.audio('speed');
    this.sfx_so = this.game.add.audio('so');
    this.sfx_explosion = this.game.add.audio('explosion');
    this.sfx_explosion.volume = 0.5;


    this.sfx_toot.onStop.add(this.stopTalkAnimation, this);
    this.sfx_lvl1.onStop.add(this.stopTalkAnimation, this);
    this.sfx_lvl2.onStop.add(this.stopTalkAnimation, this);
    this.sfx_lvl3.onStop.add(this.stopTalkAnimation, this);
    this.sfx_lvl.onStop.add(this.stopTalkAnimation, this);

    this.sfx_ooh.onStop.add(this.stopTalkAnimation, this);
    this.sfx_pleaseshift.onStop.add(this.stopTalkAnimation, this);
    this.sfx_kremt.onStop.add(this.stopTalkAnimation, this);
    this.sfx_hurry.onStop.add(this.stopTalkAnimation, this);
    this.sfx_helpful.onStop.add(this.stopTalkAnimation, this);
    this.sfx_goodwork.onStop.add(this.stopTalkAnimation, this);
    this.sfx_funny.onStop.add(this.stopTalkAnimation, this);
    this.sfx_find.onStop.add(this.stopTalkAnimation, this);
    this.sfx_failure.onStop.add(this.stopTalkAnimation, this);
    this.sfx_excellent.onStop.add(this.stopTalkAnimation, this);
    this.sfx_welldone.onStop.add(this.stopTalkAnimation, this);
    this.sfx_speed.onStop.add(this.stopTalkAnimation, this);
    this.sfx_so.onStop.add(this.stopTalkAnimation, this);
        
    this.loadMap(this.levels[this.level]);

    this.reset_button.animations.add('press', [1,0], 10, false);
    this.reset_button.inputEnabled = true;
    this.reset_button.events.onInputDown.add(this.restartLevel, this);

    this.next_button.animations.add('press', [1,0], 10, false);
    this.next_button.inputEnabled = true;
    this.next_button.events.onInputDown.add(this.nextLevel, this);
    

    this.peteBack = this.game.add.sprite(666, 370, 'pete');
    this.peteBack.frame = 21;
    this.peteBack.scale.setTo(6);
    this.pete = this.game.add.sprite(666, 370, 'pete');
    this.pete.scale.setTo(6);

    this.pete.animations.add('idle', [0,0,0,0,0,5,5,6,6,
        0,0,0,0,7,7,0,0,0,0,0,24,24,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,20,20,0,0,0,0,0,16,17,17,0,
        0,0,0,0,32,32,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,20,20,0,0,0,0,0,1,1,0,
        32,33,34,35,36,37,37,36,35,34,33,32,
        0,0,0,0,1,1,0,0,0,0,2,2,3,3,3,4,4,4,0,0,0,0,0,0,1,1,0,0,0,0,0,20,20,0,0,0,0,0,1,1,0,
        0,0,0,0,5,5,6,6,0,0,0,0,0,24,24,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,20,20,0,0,0,0,0,1,1,0,
        0,0,0,0,7,7,0,0,0,0,0,24,24,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,20,20,0,0,0,0,0,16,17,17,0,
        0,0,0,0,32,32,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,20,20,0,0,0,0,0,1,1,0,
        18,18,19,19,20,20], 10, false);

    this.pete.animations.add('toot', [16,17,18,18,18,20,16,18,18,18,20], 10, false);
    this.pete.animations.add('talk_short', [24,25,26,27,28,29,30,31], 10, false);
    this.pete.animations.add('talk_medium', [24,25,26,27,28,29,30,31,30,29,28,27,28,29,27,28,29,30,31], 10, false);
    this.pete.animations.add('talk_long', [24,25,26,27,28,29,27,28,29,27,28,29,27,28,29,27,28,29,30,31, 0,1,
        24,25,26,27,28,29,27,28,29,30,31,20,20,24,25,26,27,28,29,27,28,29,27,28,29,27,28,29,27,28,29,30,31, 0,1,
        8,9,10,11,12,13,11,12,13,11,12,13,11,12,13,14,15,0,1], 10, false);

    this.pete.animations.add('lvl1', [0,18,26,27,28,29,30,0,0,0,0,0,0,27,28,29,27,28,29,30,0,0,0,0,0,27,28,29,27,28,29,30,31, 0,1,1,0,0,
        24,25,26,27,28,29,27,28,29,20,20,24,25,26,27,28,29,28,27,28,29,27,28,29,30,0,0,0,0,29,27,28,29,27,28,29,27,28,29,30,31, 0,1,
        8,9,10,11,12,13,11,12,13,11,12,13,11,12,13,14,15,0,1], 10, false);

    this.noone = {};
    this.selected = this.noone;

    this.music.loop = true;
    this.music.play();

    this.sfx_lvl1.play();
    this.pete.animations.play("lvl1", 10, true);
    this.currentlyPlaying = this.sfx_lvl1;
//    this.pete.animations.play("idle", 10, true);
    
  },

  generateSmoke: function (train) {
 //   var smoke = this.smokeGroup.create(train.x, train.y, 'smoke');
    var smoke = this.game.add.sprite(train.x, train.y, 'smoke');
    smoke.anchor.setTo(0.5);
    smoke.scale.setTo(this.scale);
    smoke.animations.add('smoke', [0,1,2,3], 5, false);
    smoke.animations.play('smoke');
    
    this.game.add.tween(smoke).to( { alpha: 0 }, 1500, Phaser.Easing.Elastic.None, true);
    
    if (train.direction == 0) {
//        this.game.add.tween(smoke).to( { y: train.y}, 5000, 'Linear', true, 0);
      smoke.y += 3*this.scale;
    }
    else if (train.direction == 2) {
      smoke.y -= 3*this.scale;
    }   
    else if (train.direction == 1) {
      smoke.x -= 3*this.scale;
    }
    else if (train.direction == 3) {
      smoke.x += 3*this.scale;
    }
  
  },

  stopTalkAnimation: function(sound) {
// explosion.onStop.add(soundStopped, this);
    this.pete.animations.stop();
    this.pete.frame = 0;
    this.pete.animations.play("idle", 10, true);
    this.currentlyPlaying = null;

  },

  render: function() {

    
//        this.game.debug.text(this.mapSize[i], 32, 32 + i * 20);
    
        
  },

  getNewDirection: function(tile, train) {
    if (train.direction == 0) {
        if (tile.gridType == "track_cross" || tile.gridType == "track_vertical") {
            
            return 0;
        }
        else if(tile.gridType == "track_north_west") {
            
            return 1;
        }
        else if(tile.gridType == "track_north_east") {
            return 3;
        }
        else if(tile.gridType == "track_station_red_facing_north" || tile.gridType == "track_station_blue_facing_north" ||
             tile.gridType == "track_station_yellow_facing_north" || tile.gridType == "track_station_green_facing_north") {
            return 11;
        }
    }
    else if (train.direction == 1) {
        if (tile.gridType == "track_cross" || tile.gridType == "track_horizontal") {
            
            return 1;
        }
        else if(tile.gridType == "track_south_east") {
            
            return 0;
        }
        else if(tile.gridType == "track_north_east") {
            return 2;
        }
        else if(tile.gridType == "track_station_red_facing_east" || tile.gridType == "track_station_blue_facing_east" ||
            tile.gridType == "track_station_yellow_facing_east" || tile.gridType == "track_station_green_facing_east") {
            return 10;
        }
    }
    else if (train.direction == 2) {
        if (tile.gridType == "track_cross" || tile.gridType == "track_vertical") {
            
            return 2;
        }
        else if(tile.gridType == "track_south_west") {
            
            return 1;
        }
        else if(tile.gridType == "track_south_east") {
            return 3;
        }
        else if(tile.gridType == "track_station_red_facing_south" || tile.gridType == "track_station_blue_facing_south" ||
            tile.gridType == "track_station_yellow_facing_south" || tile.gridType == "track_station_green_facing_south") {
            return 20;
        }
    }
    else if (train.direction == 3) {
        if (tile.gridType == "track_cross" || tile.gridType == "track_horizontal") {
            
            return 3;
        }
        else if(tile.gridType == "track_south_west") {
            
            return 0;
        }
        else if(tile.gridType == "track_north_west") {
            return 2;
        }
        else if(tile.gridType == "track_station_red_facing_west" || tile.gridType == "track_station_blue_facing_west" || 
            tile.gridType == "track_station_yellow_facing_west" || tile.gridType == "track_station_green_facing_west") {
            return 30;
        }
    }

    return -1;

  },

  getTileName: function(tile) {
    switch (parseInt(tile)) {
      case 0: return 'empty';
      case 1: return 'grass';
      case 12: return 'track_cross';
      case 13: return 'track_horizontal';
      case 14: return 'track_vertical';
      case 15: return 'track_south_west';
      case 16: return 'track_north_west';
      case 17: return 'track_north_east';
      case 18: return 'track_south_east';
      
       //  0 is down, 1 is left, 2 is up, 3 is right
      case 20: return 'track_station_red_facing_south';
      case 21: return 'track_station_red_facing_west';
      case 22: return 'track_station_red_facing_north';
      case 23: return 'track_station_red_facing_east';
      case 30: return 'track_station_blue_facing_south';
      case 31: return 'track_station_blue_facing_west';
      case 32: return 'track_station_blue_facing_north';
      case 33: return 'track_station_blue_facing_east';
      case 40: return 'track_station_yellow_facing_south';
      case 41: return 'track_station_yellow_facing_west';
      case 42: return 'track_station_yellow_facing_north';
      case 43: return 'track_station_yellow_facing_east';
      case 50: return 'track_station_green_facing_south';
      case 51: return 'track_station_green_facing_west';
      case 52: return 'track_station_green_facing_north';
      case 53: return 'track_station_green_facing_east';

      case 102: return 'mountain';

      default: return null;
    }

  },



  loadMap: function(level) {

    var level = this.game.cache.getText(level);

    text = level.split('\n');
    
    this.levelText.text = "Level " + this.level + ": " + text[0];

    size = text[1].split(',');
    this.gridSizeX = size[0];
    this.gridSizeY = size[1];

    if (this.gridSizeY < 6 && this.gridSizeX < 5) {
        this.scale = 3;
        this.startGridX = 260;
    }
    else if (this.gridSizeY < 6 && this.gridSizeX < 7) {
        this.scale = 3;
        this.startGridX = 90;
    }
    else if (this.gridSizeY < 8 && this.gridSizeX < 10) {
        this.scale = 2;
        this.startGridX = 90;
    }
    else {
        this.scale = 1;
        this.startGridX = 90;
    }

    var totalTrains = size[2];
    
    this.tiles = new Array(this.gridSizeY);
    //console.log( "Size: " + this.gridSizeX + "x," + this.gridSizeY);

    for (var y = 0; y < this.gridSizeY; y++) {
      this.tiles[y] = new Array(this.gridSizeX);

      var tileRow = text[y+2+parseInt(totalTrains)].split(',');

      for (var x = 0; x < this.gridSizeX; x++) {
        var tmp = this.getTileName(tileRow[x]);
    
        this.tiles[y][x] = this.tilesGroup.create(this.startGridX + this.scale*32*x + x, this.startGridY + this.scale*32*y + y, 'tiles');
        this.tiles[y][x].anchor.setTo(0.5);
        this.tiles[y][x].scale.setTo(this.scale);
        this.tiles[y][x].gridX = x;
        this.tiles[y][x].gridY = y;

        if (tmp == 'empty') {
          this.tiles[y][x].gridEmpty = true;
        }
        else {
          this.tiles[y][x].gridEmpty = false;
        }

        if (parseInt(tileRow[x]) >= 20) {
          this.tiles[y][x].moveable = false;
        }
        else {
          this.tiles[y][x].moveable = true;

        }

        this.tiles[y][x].gridType = tmp;

        if (tmp == "track_station_red_facing_south") {
            this.tiles[y][x].stationName = "Snoqualmie";
            this.tiles[y][x].frame = 26;

        }
        else if (tmp == "track_station_red_facing_north") {
            this.tiles[y][x].stationName = "Roslyn";
            this.tiles[y][x].frame = 25;
        }
        else if (tmp == "track_station_red_facing_east") {
            this.tiles[y][x].stationName = "Bridgend";
            this.tiles[y][x].frame = 3;
        }
        else if (tmp == "track_station_red_facing_west") {
            this.tiles[y][x].stationName = "Ammanford";
            this.tiles[y][x].frame = 4;
        }
        else if (tmp == "track_station_blue_facing_south") {
            this.tiles[y][x].stationName = "Monkwearmouth";
            this.tiles[y][x].frame = 26;
        }
        else if (tmp == "track_station_blue_facing_north") {
            this.tiles[y][x].stationName = "Stafford";
            this.tiles[y][x].frame = 25;
        }
        else if (tmp == "track_station_blue_facing_east") {
            this.tiles[y][x].stationName = "Rhymney";
            this.tiles[y][x].frame = 3;
        }
        else if (tmp == "track_station_blue_facing_west") {
            this.tiles[y][x].stationName = "Whitland";
            this.tiles[y][x].frame = 4;
        }
        else if (tmp == "track_station_yellow_facing_south") {
            this.tiles[y][x].stationName = "Haverford";
            this.tiles[y][x].frame = 26;
        }
        else if (tmp == "track_station_yellow_facing_north") {
            this.tiles[y][x].stationName = "Wolferton";
            this.tiles[y][x].frame = 25;
        }
        else if (tmp == "track_station_yellow_facing_east") {
            this.tiles[y][x].stationName = "Saundersfoot";
            this.tiles[y][x].frame = 3;
        }
        else if (tmp == "track_station_yellow_facing_west") {
            this.tiles[y][x].stationName = "Hindolvestone";
            this.tiles[y][x].frame = 4;
        }
        else if (tmp == "track_station_green_facing_south") {
            this.tiles[y][x].stationName = "Common Lane";
            this.tiles[y][x].frame = 26;
        }
        else if (tmp == "track_station_green_facing_north") {
            this.tiles[y][x].stationName = "Tower View";
            this.tiles[y][x].frame = 25;
        }
        else if (tmp == "track_station_green_facing_east") {
            this.tiles[y][x].stationName = "Pinesway Junction";
            this.tiles[y][x].frame = 3;
        }
        else if (tmp == "track_station_green_facing_west") {
            this.tiles[y][x].stationName = "Park Lane";
            this.tiles[y][x].frame = 4;
        }
        else if (tmp == "grass") {            
            this.tiles[y][x].frame = 0;
        }
        else if (tmp == "track_cross") {
            this.tiles[y][x].frame = 1;
        }
        else if (tmp == "track_horizontal") {            
            this.tiles[y][x].frame = 2;
        }
        else if (tmp == "track_vertical") {            
            this.tiles[y][x].frame = 8;
        }
        else if (tmp == "mountain") {            
            this.tiles[y][x].frame = 12;
        }
        else if (tmp == "track_south_east") {            
            this.tiles[y][x].frame = 17;
        }
        else if (tmp == "track_south_west") {            
            this.tiles[y][x].frame = 10;
        }
        else if (tmp == "track_north_east") {            
            this.tiles[y][x].frame = 9;
        }
        else if (tmp == "track_north_west") {            
            this.tiles[y][x].frame = 18;
        }
        else if (tmp == "empty") {
            this.tiles[y][x].frame = 7;
        }


        this.tiles[y][x].inputEnabled = true;
        this.tiles[y][x].events.onInputDown.add(this.actionOnClick, this);

      }
    }

    this.goalsText.text = "";
    trains = {};

    for (var i = 1; i <= totalTrains; i++) {
        //this.train = this.trainGroup.create(this.startGridX + 32*2 + 1*2 + 16, this.startGridY + 16, 'train_red');
        var trainData = text[i+1].split(',');
        
        var train = this.trainGroup.create(this.startGridX + (this.scale*32*parseInt(trainData[0]) + parseInt(trainData[0])),
            (this.startGridY + (this.scale*32*parseInt(trainData[1])) + parseInt(trainData[1])), 
            "train_" + this.trainColours[i]);
        train.gridX = trainData[0];
        train.gridY = trainData[1];
        train.goalX = trainData[2];
        train.goalY = trainData[3];
        train.startTime = trainData[4];
        train.isdead = false;
        if (this.firstTime) {
            train.startTime = parseInt(trainData[4]) + 30;
            this.firstTime = false;
        }
        train.speed = trainData[5];
        train.anchor.setTo(0.5);
        train.scale.setTo(this.scale, -this.scale);
        train.direction = trainData[6];
        if (train.direction == 0) {
            train.angle = 0;
        }
        else if (train.direction == 1) {
            train.angle = 90;

        }
        else if (train.direction == 2) {
            train.angle = 180;
            //train.scale.setTo(this.scale, this.scale);
        }
        else if (train.direction == 3) {
            train.angle = -90;
        }

        

        train.turnTimeout = 50;
        train.stoppped = false;
        train.success = false;
        train["from"] = this.tiles[train.gridY][train.gridX].stationName;
        train["to"] = this.tiles[train.goalY][train.goalX].stationName;
        train["startTime"] = train.startTime;

    }

    
    this.winSpeedBoost = 1;
    this.startLevel();
    if (this.currentlyPlaying != null) {
        this.currentlyPlaying.stop();
    }

    if (this.level == 2) {
        this.sfx_lvl2.play();
        this.currentlyPlaying = this.sfx_lvl2;
    }
    else if (this.level == 3) {
        this.sfx_lvl3.play();
        this.currentlyPlaying = this.sfx_lvl3;
    }
    else if (this.level > 2) {

        this.sfx_lvl.play();
        this.currentlyPlaying = this.sfx_lvl;
    }
  },

  actionOnClick: function (sprite, pointer) {
//    console.log("you clicked on " + sprite.gridX + "/"  + sprite.gridY);
    var clickedX = sprite.gridX;
    var clickedY = sprite.gridY;
    if (sprite.gridEmpty) {
        this.errorText.text = "Select the tile you want to move";
        this.errorText.timer = this.timerTimeout;
    }
    else if(!this.tiles[clickedY][clickedX].moveable) {
        if (sprite.gridType == "mountain") {
            this.errorText.text = "Can't move lakes!";
            this.errorText.timer = this.timerTimeout;
        }
        else if (sprite.gridType == "track_station_red_facing_south" ||
            sprite.gridType == "track_station_red_facing_west" ||
            sprite.gridType == "track_station_red_facing_north" ||
            sprite.gridType == "track_station_red_facing_east" || 
            sprite.gridType == "track_station_blue_facing_south" ||
            sprite.gridType == "track_station_blue_facing_west" ||
            sprite.gridType == "track_station_blue_facing_north" ||
            sprite.gridType == "track_station_blue_facing_east" ||
            sprite.gridType == "track_station_yellow_facing_south" ||
            sprite.gridType == "track_station_yellow_facing_west" ||
            sprite.gridType == "track_station_yellow_facing_north" ||
            sprite.gridType == "track_station_yellow_facing_east" || 
            sprite.gridType == "track_station_green_facing_south" ||
            sprite.gridType == "track_station_green_facing_west" ||
            sprite.gridType == "track_station_green_facing_north" ||
            sprite.gridType == "track_station_green_facing_east") {

            this.errorText.text = sprite.stationName + " (Stations can't be moved)";
            this.errorText.timer = this.timerTimeout;
        }
        else {
            this.errorText.text = "Can't shift this rail - a train is using it!";   
            this.errorText.timer = this.timerTimeout;
        }
    }
    else {
        this.score++;
        if (clickedX > 0) {
            if (this.tiles[clickedY][clickedX - 1].gridEmpty) {
                // swap
                this.tiles[clickedY][clickedX].gridX--;
                this.tiles[clickedY][clickedX].x += -1 - 32*parseInt(this.scale);
                this.tiles[clickedY][clickedX - 1].gridX++;
                this.tiles[clickedY][clickedX - 1].x += 1 + 32*this.scale;;

                var tmp = this.tiles[clickedY][clickedX - 1];
                this.tiles[clickedY][clickedX - 1] = this.tiles[clickedY][clickedX];
                this.tiles[clickedY][clickedX] = tmp;

                this.checkWin();
                return true;

            }
        }
        if (clickedX < this.gridSizeX - 1) {
            if (this.tiles[clickedY][clickedX + 1].gridEmpty) {
                // swap
                this.tiles[clickedY][clickedX].gridX++;
                this.tiles[clickedY][clickedX].x += 1 + 32*this.scale;
                this.tiles[clickedY][clickedX + 1].gridX--;
                this.tiles[clickedY][clickedX + 1].x += -1 - 32*this.scale;

                var tmp = this.tiles[clickedY][clickedX + 1];
                this.tiles[clickedY][clickedX + 1] = this.tiles[clickedY][clickedX];
                this.tiles[clickedY][clickedX] = tmp;
                
                this.checkWin();
                return true;
            }   
        }
        if (clickedY > 0) {
            if (this.tiles[clickedY - 1][clickedX].gridEmpty) {
                // swap
                this.tiles[clickedY][clickedX].gridY--;
                this.tiles[clickedY][clickedX].y += -1 - 32*this.scale;
                this.tiles[clickedY - 1][clickedX].gridY++;
                this.tiles[clickedY - 1][clickedX].y += 1 + 32*this.scale;

                var tmp = this.tiles[clickedY - 1][clickedX];
                this.tiles[clickedY - 1][clickedX] = this.tiles[clickedY][clickedX];
                this.tiles[clickedY][clickedX] = tmp;
                
                this.checkWin();
                return true;

            }
        }
        if (clickedY < this.gridSizeY - 1) {
            if (this.tiles[clickedY + 1][clickedX].gridEmpty) {
                // swap
                this.tiles[clickedY][clickedX].gridY++;
                this.tiles[clickedY][clickedX].y += 1 + 32*this.scale;
                this.tiles[clickedY + 1][clickedX].gridY--;
                this.tiles[clickedY + 1][clickedX].y += -1 - 32*this.scale;

                var tmp = this.tiles[clickedY + 1][clickedX];
                this.tiles[clickedY + 1][clickedX] = this.tiles[clickedY][clickedX];
                this.tiles[clickedY][clickedX] = tmp;
                
                this.checkWin();
                return true;
            }   
        }
    }


  },

  gameover: function() {
    this.gamewon = true;
    this.errorText.text = "That's it. You've cleared all the levels!\n             Well done!";
    if (this.currentlyPlaying != null) {
        this.currentlyPlaying.stop();
    }

    this.sfx_welldone.play();
    this.currentlyPlaying = this.sfx_welldone;

  },

  nextLevel: function (sprite, pointer) {
    if (!this.win) {
     //   return false;
    }

    this.next_button.animations.play("press");

    this.tilesGroup.forEach(function(tile) {
        tile.kill();
    }, this);
    this.trainGroup.forEach(function(tile) {
        tile.kill();
    }, this);

    this.tilesGroup = null;
    this.trainGroup = null;
    this.tilesGroup = this.game.add.group();    
    this.trainGroup = this.game.add.group();

    this.level++;
    if (this.level == this.levels.length) {
        this.gameover();
    }
    else {
        this.loadMap(this.levels[this.level]);
    }
  },

  restartLevel: function (sprite, pointer) {
    this.tilesGroup.forEach(function(tile) {
        tile.kill();
    }, this);

    this.trainGroup.forEach(function(tile) {
        tile.kill();
    }, this);

    this.tilesGroup = null;
    this.trainGroup = null;
    this.tilesGroup = this.game.add.group();    
    this.trainGroup = this.game.add.group();


    this.reset_button.animations.play("press");
    this.loadMap(this.levels[this.level]);
  },

  startLevel: function() {
    this.startTime = this.game.time.now;
    this.score = 0;
    this.timer = 0;
    this.win = false;
    this.next_button.animations.stop();
    this.next_button.frame = 0;//2;
    this.errorText.text = "";
  },
  checkWin: function() {
    return false;

    var win = true;
    this.tilesGroup.forEach(function(tile) {
        if (tile.gridType == "track_station_red_facing_south") {
            var testDir = 0; //  0 is down, 1 is left, 2 is up, 3 is right
            var testX = tile.gridX;
            var testY = tile.gridY;
            var finishedTrack = false;
            testY++;
            while (testY < this.gridSizeY && testX < this.gridSizeX && !finishedTrack) {
                
                if (testDir == 0) {
                    if (this.tiles[testY][testX].gridType == "track_station_red_facing_north") {
                        finishedTrack = true;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_vertical" || this.tiles[testY][testX].gridType == "track_cross") {
                        testY++;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_north_east") {
                        testX++;
                        testDir = 3;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_north_west") {
                        testX--;
                        testDir = 1;
                    }
                    else {
                        win = false;
                        testY = this.gridSizeY;
                    }
                    
                }
                else if (testDir == 1) {
                    if (this.tiles[testY][testX].gridType == "track_station_red_bot_facing_east") {
                        finishedTrack = true;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_horizontal" || this.tiles[testY][testX].gridType == "track_cross") {
                        testX--;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_south_east") {
                        testY++;
                        testDir = 0;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_north_east") {
                        testY--;
                        testDir = 2;
                    }
                    else {
                        win = false;
                        testY = this.gridSizeY;
                    }
                    
                }
                else if (testDir == 2) {
                    if (this.tiles[testY][testX].gridType == "track_station_red_bot_facing_south") {
                        finishedTrack = true;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_vertical" || this.tiles[testY][testX].gridType == "track_cross") {
                        testY--;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_south_east") {
                        testX++;
                        testDir = 3;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_south_west") {
                        testX--;
                        testDir = 1;
                    }
                    else {
                        win = false;
                        testY = this.gridSizeY;
                    }
                    
                }
                else if (testDir == 3) {
                    if (this.tiles[testY][testX].gridType == "track_station_red_bot_facing_west") {
                        finishedTrack = true;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_horizontal" || this.tiles[testY][testX].gridType == "track_cross") {
                        testX++;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_south_west") {
                        testY++;
                        testDir = 0;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_north_west") {
                        testY--;
                        testDir = 2;
                    }
                    else {
                        win = false;
                        testY = this.gridSizeY;
                    }
                    
                }

            }
            if (!finishedTrack) {
                win = false;
            }
        }
        else if (tile.gridType == "track_station_blue_facing_south") {
            var testDir = 0; //  0 is down, 1 is left, 2 is up, 3 is right
            var testX = tile.gridX;
            var testY = tile.gridY;
            var finishedTrack = false;
            testY++;
            while (testY < this.gridSizeY && testX < this.gridSizeX && !finishedTrack) {
                
                if (testDir == 0) {
                    if (this.tiles[testY][testX].gridType == "track_station_blue_facing_north") {
                        finishedTrack = true;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_vertical" || this.tiles[testY][testX].gridType == "track_cross") {
                        testY++;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_north_east") {
                        testX++;
                        testDir = 3;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_north_west") {
                        testX--;
                        testDir = 1;
                    }
                    else {
                        win = false;
                        testY = this.gridSizeY;
                    }
                    
                }
                else if (testDir == 1) {
                    if (this.tiles[testY][testX].gridType == "track_station_blue_bot_facing_east") {
                        finishedTrack = true;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_horizontal" || this.tiles[testY][testX].gridType == "track_cross") {
                        testX--;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_south_east") {
                        testY++;
                        testDir = 0;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_north_east") {
                        testY--;
                        testDir = 2;
                    }
                    else {
                        win = false;
                        testY = this.gridSizeY;
                    }
                    
                }
                else if (testDir == 2) {
                    if (this.tiles[testY][testX].gridType == "track_station_blue_bot_facing_south") {
                        finishedTrack = true;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_vertical" || this.tiles[testY][testX].gridType == "track_cross") {
                        testY--;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_south_east") {
                        testX++;
                        testDir = 3;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_south_west") {
                        testX--;
                        testDir = 1;
                    }
                    else {
                        win = false;
                        testY = this.gridSizeY;
                    }
                    
                }
                else if (testDir == 3) {
                    if (this.tiles[testY][testX].gridType == "track_station_blue_bot_facing_west") {
                        finishedTrack = true;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_horizontal" || this.tiles[testY][testX].gridType == "track_cross") {
                        testX++;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_south_west") {
                        testY++;
                        testDir = 0;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_north_west") {
                        testY--;
                        testDir = 2;
                    }
                    else {
                        win = false;
                        testY = this.gridSizeY;
                    }
                    
                }

            }
            if (!finishedTrack) {
                win = false;
            }
        }
        else if (tile.gridType == "track_station_yellow_facing_south") {
            var testDir = 0; //  0 is down, 1 is left, 2 is up, 3 is right
            var testX = tile.gridX;
            var testY = tile.gridY;
            var finishedTrack = false;
            testY++;
            while (testY < this.gridSizeY && testX < this.gridSizeX && !finishedTrack) {
                
                if (testDir == 0) {
                    if (this.tiles[testY][testX].gridType == "track_station_yellow_facing_north" ||
                        this.tiles[testY][testX].gridType == "track_station_yellow_facing_west" || 
                        this.tiles[testY][testX].gridType == "track_station_yellow_facing_south" ||
                        this.tiles[testY][testX].gridType == "track_station_yellow_facing_west") {
                        finishedTrack = true;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_vertical" || this.tiles[testY][testX].gridType == "track_cross") {
                        testY++;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_north_east") {
                        testX++;
                        testDir = 3;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_north_west") {
                        testX--;
                        testDir = 1;
                    }
                    else {
                        win = false;
                        testY = this.gridSizeY;
                    }
                    
                }
                else if (testDir == 1) {
                    if (this.tiles[testY][testX].gridType == "track_station_yellow_bot_facing_east") {
                        finishedTrack = true;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_horizontal" || this.tiles[testY][testX].gridType == "track_cross") {
                        testX--;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_south_east") {
                        testY++;
                        testDir = 0;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_north_east") {
                        testY--;
                        testDir = 2;
                    }
                    else {
                        win = false;
                        testY = this.gridSizeY;
                    }
                    
                }
                else if (testDir == 2) {
                    if (this.tiles[testY][testX].gridType == "track_station_yellow_bot_facing_south") {
                        finishedTrack = true;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_vertical" || this.tiles[testY][testX].gridType == "track_cross") {
                        testY--;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_south_east") {
                        testX++;
                        testDir = 3;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_south_west") {
                        testX--;
                        testDir = 1;
                    }
                    else {
                        win = false;
                        testY = this.gridSizeY;
                    }
                    
                }
                else if (testDir == 3) {
                    if (this.tiles[testY][testX].gridType == "track_station_yellow_bot_facing_west") {
                        finishedTrack = true;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_horizontal" || this.tiles[testY][testX].gridType == "track_cross") {
                        testX++;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_south_west") {
                        testY++;
                        testDir = 0;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_north_west") {
                        testY--;
                        testDir = 2;
                    }
                    else {
                        win = false;
                        testY = this.gridSizeY;
                    }
                    
                }

            }
            if (!finishedTrack) {
                win = false;
            }
        }
        else if (tile.gridType == "track_station_blue_facing_south") {
            var testDir = 0; //  0 is down, 1 is left, 2 is up, 3 is right
            var testX = tile.gridX;
            var testY = tile.gridY;
            var finishedTrack = false;
            testY++;
            while (testY < this.gridSizeY && testX < this.gridSizeX && !finishedTrack) {
                
                if (testDir == 0) {
                    if (this.tiles[testY][testX].gridType == "track_station_blue_facing_north") {
                        finishedTrack = true;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_vertical" || this.tiles[testY][testX].gridType == "track_cross") {
                        testY++;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_north_east") {
                        testX++;
                        testDir = 3;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_north_west") {
                        testX--;
                        testDir = 1;
                    }
                    else {
                        win = false;
                        testY = this.gridSizeY;
                    }
                    
                }
                else if (testDir == 1) {
                    if (this.tiles[testY][testX].gridType == "track_station_blue_bot_facing_east") {
                        finishedTrack = true;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_horizontal" || this.tiles[testY][testX].gridType == "track_cross") {
                        testX--;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_south_east") {
                        testY++;
                        testDir = 0;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_north_east") {
                        testY--;
                        testDir = 2;
                    }
                    else {
                        win = false;
                        testY = this.gridSizeY;
                    }
                    
                }
                else if (testDir == 2) {
                    if (this.tiles[testY][testX].gridType == "track_station_blue_bot_facing_south") {
                        finishedTrack = true;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_vertical" || this.tiles[testY][testX].gridType == "track_cross") {
                        testY--;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_south_east") {
                        testX++;
                        testDir = 3;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_south_west") {
                        testX--;
                        testDir = 1;
                    }
                    else {
                        win = false;
                        testY = this.gridSizeY;
                    }
                    
                }
                else if (testDir == 3) {
                    if (this.tiles[testY][testX].gridType == "track_station_blue_bot_facing_west") {
                        finishedTrack = true;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_horizontal" || this.tiles[testY][testX].gridType == "track_cross") {
                        testX++;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_south_west") {
                        testY++;
                        testDir = 0;
                    }
                    else if (this.tiles[testY][testX].gridType == "track_north_west") {
                        testY--;
                        testDir = 2;
                    }
                    else {
                        win = false;
                        testY = this.gridSizeY;
                    }
                    
                }

            }
            if (!finishedTrack) {
                win = false;
            }
        }
    }, this);
    
    if (win) {
        this.winSpeedBoost = 1; //2;
    }
    else {
        this.winSpeedBoost = 1;
    }
        //this.scoreText.text = "            You win!";
        //this.game.paused = true;
        //return true;
    
  
  },

  update: function() {

    this.timer++;

    if (!this.win) {
        this.timeSpent = this.game.time.now - this.startTime;
    }
//    this.timeText.text = "Time: " + this.game.math.roundTo(this.timeSpent / 1000, -1) + " s";
    this.timeText.text = "Time: " + parseFloat(this.timeSpent / 1000).toFixed(1) + "s";
    this.scoreText.text = "Number of moves: " + this.score;

    if (this.errorText.timer == 0) {
        this.errorText.text = '';
    }
    else if (this.errorText.timer > 0) {
        this.errorText.timer -= 1;
    }


    if (this.level > 1 && parseInt(this.timeSpent/1000) > 5 && this.game.rnd.integerInRange(0, 800) == 0)  {
        var sound = this.game.rnd.integerInRange(0, 9);
        if (this.currentlyPlaying != null) {
            this.currentlyPlaying.stop();
        }

        switch (sound) {
            case 0: this.sfx_ooh.play();
            this.currentlyPlaying = this.sfx_ooh;
            this.pete.animations.play("toot");
            break;
            case 1: this.sfx_kremt.play();
            this.currentlyPlaying = this.sfx_kremt;
            break;
            case 2: this.sfx_find.play();
            this.currentlyPlaying = this.sfx_find;
            this.pete.animations.play("talk_short");
            break;
            case 3: this.sfx_failure.play();
            this.currentlyPlaying = this.sfx_failure;
            this.pete.animations.play("talk_short");
            break;
            case 4: this.sfx_speed.play();
            this.currentlyPlaying = this.sfx_speed;
            this.pete.animations.play("talk_short");
            break;
            case 5: this.sfx_hurry.play();
            this.currentlyPlaying = this.sfx_hurry;
            this.pete.animations.play("talk_short");
            break;
            case 6: this.sfx_helpful.play();
            this.currentlyPlaying = this.sfx_helpful;
            this.pete.animations.play("talk_short");
            break;
            case 7: this.sfx_funny.play();
            this.currentlyPlaying = this.sfx_funny;
            this.pete.animations.play("talk_medium");
            break;
            case 8: this.sfx_pleaseshift.play();
            this.currentlyPlaying = this.sfx_pleaseshift;
            this.pete.animations.play("talk_medium");
            break;
            case 9: 
            if (this.so) {
                this.sfx_so.play(); 
                this.currentlyPlaying = this.sfx_so;
                this.pete.animations.play("talk_medium");
                this.so = false;
            }
            else {
                this.sfx_kremt.play();
                this.currentlyPlaying = this.sfx_kremt;

            }
            break;
        }

    }
   
 //   if (this.game.input.mousePointer.isDown) {
   //     this.getTileAtPos(this.game.input.x, this.game.input.y);
    //}

    var tmpText = "";
    var success = true;

    this.trainGroup.forEach(function(train1) {
      this.trainGroup.forEach(function(train2) {
        if (this.distanceBetweenTwoPoints(train1, train2) < (15*this.scale) && train1 != train2 && !train1.isdead && !train2.isdead) {
            var explosion = this.game.add.sprite(train1.x, train1.y, 'tiles');
            explosion.anchor.setTo(0.5);
            explosion.scale.setTo(this.scale);
            explosion.frame = 5;
            this.game.add.tween(explosion).to( { alpha: 0 }, 300, Phaser.Easing.Elastic.None, true);
            var explosion = this.game.add.sprite(train2.x, train2.y, 'tiles');
            explosion.anchor.setTo(0.5);
            explosion.scale.setTo(this.scale);
            explosion.frame = 5;
            this.game.add.tween(explosion).to( { alpha: 0 }, 300, Phaser.Easing.Elastic.None, true);
            train1.isdead = true;
            train2.isdead = true;
            train1.kill();
            train2.kill();
            this.sfx_explosion.play();
            this.sfx_failure.play();

        }
    }, this);


      if (!train1.success) {
        success = false;
      }

      tmpText += "\nTrain from " + train1["from"] + "\ngoing to " + train1["to"];



      if (parseFloat(train1.startTime - (this.timeSpent/1000)) > 0) {
        tmpText += "\ndeparting in " + parseFloat(train1["startTime"] - (this.timeSpent/1000)).toFixed(1) + "s";
        if (parseFloat(train1.startTime - (this.timeSpent/1000)) < 0.2) {
            if (this.currentlyPlaying != null) {
                this.currentlyPlaying.stop();
            }

            this.sfx_toot.play();
            this.currentlyPlaying = this.sfx_toot;
            this.pete.animations.play("toot");
        }
      }
      else if (!train1.stopped && !train1.isdead && (parseFloat(train1.startTime) + this.timer) % parseInt(100/train1.speed) == 0) {

        this.generateSmoke(train1);


      }
      tmpText += ".\n";

      if (parseFloat(train1.startTime - (this.timeSpent/1000)) < 0 && !train1.stoppped) {

        var fail = 1;
//        console.log("checking at :" + train1.x + "," + train1.y);
        var tileAt = this.getTileAtPos(Math.round(train1.x), Math.round(train1.y));
  //      console.log(tileAt.gridX + "," + tileAt.gridY);

        if (tileAt == null) {
            tileAt = train1;
        }

        if (tileAt.gridX != train1.gridX || tileAt.gridY != train1.gridY) {
            fail = parseInt( this.getNewDirection(this.tiles[parseInt(tileAt.gridY)][parseInt(tileAt.gridX)], train1) );
            if (-1 != fail) {
                this.tiles[tileAt.gridY][tileAt.gridX].moveable = false;

                var sprite = this.tiles[train1.gridY][train1.gridX];
                if (sprite.gridType == "track_station_red_facing_south" ||
                sprite.gridType == "track_station_red_facing_west" ||
                sprite.gridType == "track_station_red_facing_north" ||
                sprite.gridType == "track_station_red_facing_east" || 
                sprite.gridType == "track_station_blue_facing_south" ||
                sprite.gridType == "track_station_blue_facing_west" ||
                sprite.gridType == "track_station_blue_facing_north" ||
                sprite.gridType == "track_station_blue_facing_east" ||                 
                sprite.gridType == "track_station_yellow_facing_south" ||
                sprite.gridType == "track_station_yellow_facing_west" ||
                sprite.gridType == "track_station_yellow_facing_north" ||
                sprite.gridType == "track_station_yellow_facing_east" || 
                sprite.gridType == "track_station_green_facing_south" ||
                sprite.gridType == "track_station_green_facing_west" ||
                sprite.gridType == "track_station_green_facing_north" ||
                sprite.gridType == "track_station_green_facing_east") {
                    // cant move it; do nothing
                }
                else {
                    this.tiles[train1.gridY][train1.gridX].moveable = true;
                }
        
                train1.gridX = parseInt(tileAt.gridX);
                train1.gridY = parseInt(tileAt.gridY);
                
                
            }
        }
        if (-1 == fail)  {}
            else {
        if (train1.direction == 0) {
          train1.y += 0.1 * train1.speed * this.scale * this.winSpeedBoost;
        }
        else if (train1.direction == 1) {
          train1.x -= 0.1 * train1.speed * this.scale * this.winSpeedBoost;
        }
        else if (train1.direction == 2) {
          train1.y -= 0.1 * train1.speed * this.scale * this.winSpeedBoost;
        }
        else if (train1.direction == 3) {
          train1.x += 0.1 * train1.speed * this.scale * this.winSpeedBoost;
        }
}


     //   console.log(train.turnTimeout);
        //
//console.log("YS: " + (train1.x - this.startGridX) % (32*parseInt(this.scale))+ "," + (train1.y - this.startGridY) % (32*parseInt(this.scale)));
        if (train1.turnTimeout > 1) {
            train1.turnTimeout --;
        }
        else {
      //console.log("ye");
          if(((train1.x - this.startGridX) % (32*parseInt(this.scale)) < (this.scale*0.5) && (train1.direction == 1 || train1.direction == 3)) 
            || ((train1.y - this.startGridY) % (32*parseInt(this.scale)) < (this.scale*0.5) && (train1.direction == 0 || train1.direction == 2))) {
      
            

            train1.x = Math.round(train1.x);
            train1.y = Math.round(train1.y);
//            console.log(train1.x + "," + train1.y);
  //          console.log("grid: " + train1.gridX + "," + train1.gridY);
    //        console.log("old dir: " + train1.direction);
            train1.direction = parseInt( this.getNewDirection(this.tiles[parseInt(train1.gridY)][parseInt(train1.gridX)], train1) );
  //          console.log("got new direction " + train1.direction);
            if (train1.direction == 0) {
                train1.angle = 0;
            }
            else if (train1.direction == 1) {
                train1.angle = 90;
            }
            else if (train1.direction == 2) {
                train1.angle = 180;
            }
            else if (train1.direction == 3) {
                train1.angle = -90;
            }
            else if (train1.direction > 3) {
                train1.stopped = true;
                if (train1.goalX == train1.gridX && train1.goalY == train1.gridY) {
                    train1.success = true;
                }
            }
//            console.log("new dir: " + train1.direction);
            train1.turnTimeout = parseInt(50);
          }

        }
      }
    }, this);

    this.goalsText.text = tmpText;
    if (success) {
        if (!this.win) {
          var sound = this.game.rnd.integerInRange(0, 2);
          if (this.currentlyPlaying != null) {
              this.currentlyPlaying.stop();
          }
          switch (sound) {
            case 0: this.sfx_welldone.play();
            this.currentlyPlaying = this.sfx_welldone;
            this.pete.animations.play("welldone");
            break;
            case 1: this.sfx_excellent.play();
            this.currentlyPlaying = this.sfx_excellent;
            this.pete.animations.play("excellent");
            break;
            case 2: this.sfx_goodwork.play();
            this.currentlyPlaying = this.sfx_goodwork;
            this.pete.animations.play("goodwork");
            break;
          }

          this.sendScore(getUserhash(), this.level, this.timeSpent, this.score);           
        }
        this.win = true;
        this.next_button.frame = 0;
        this.errorText.text = "Success! Click next to continue!";
    }
    if (this.gamewon) { 
        this.errorText.text = "That's it. You've cleared all the levels!\n                    Well done!";
    }

  },

  getTimestamp: function() {
    if (!Date.now) {
      Date.now = function() { return new Date().getTime();  }
    }
    return Date.now();
  },


  sendScore : function(username, level, time, moves) {

    var data="username="+username+"&level="+level+"&time="+time+"&moves="+moves+"&timestamp="+this.getTimestamp();

    var request = new XMLHttpRequest();
    request.open('POST', 'http://myperfectgame.com/node/ld35/sendScore', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    request.send(data);
  },

  getTileAtPos: function(x, y) {
    var mytile = null
    this.tilesGroup.forEach(function(tile) {  
      if (tile.x >= (x-(32*this.scale/2)) && tile.x <= (x+(32*this.scale/2)) && tile.y >= (y-(32*this.scale/2)) && tile.y <= (y+(32*this.scale/2))) {
     //   console.log( "tile at " + tile.x + "," + tile.y + ": " + tile.gridType);
        mytile = tile;
        //this.selected.tint = Math.random() * 0xffffff;
        
      }

    }, this);
    
    return mytile;
  },

  distanceBetweenTwoPoints: function(a, b) {
    var xs = b.x - a.x;
    xs = xs * xs;

    var ys = b.y - a.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
  },

};
