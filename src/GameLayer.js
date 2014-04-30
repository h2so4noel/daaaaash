var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.timeout = 15 * 60;
        this._super();

        this.setPosition( new cc.Point( 0, 0 ) );

        this.createBackground();
        this.createPlayer();
        this.createBricks();
        this.createGoal();
        this.createLabel();

        this.setKeyboardEnabled(true);
        this.scheduleUpdate();
        return true;
    },

    createBackground: function(){
        this.background = cc.Sprite.create('res/images/bg.png')
        this.background.setAnchorPoint( new cc.Point(0, 0));
        this.addChild(this.background, 0);
    },

    createLabel: function(){
        this.countlbl = cc.LabelTTF.create('0', 'Arial', 30);
        this.countlbl.setString(this.timeout / 60);
        this.countlbl.setPosition(cc.p(screenWidth * 95 / 100, screenHeight * 95 / 100));
        this.addChild(this.countlbl);
    },

    generateScore: function(){
        this.score = this.brickCount * this.timeout;
        return this.score;
    },

    createPlayer: function(){
        this.player = new Player();
        this.addChild(this.player);
        this.player.setPosition(cc.p(screenWidth * 50 / 100, screenHeight * 10 / 100));
        this.player.scheduleUpdate();
    },

    createBricks: function(){
        this.brickCount = this.randomCount();
        console.log(this.brickCount);
        this.bricks = [];

        console.log(this.randomWidth());
        console.log(this.randomHeight());

        for(var i = 0; i < this.brickCount; i++){
            this.temp = this.getBrick();
            this.bricks[i] = this.temp;
        }
    },

    createGoal: function(){
        this.goal = new Goal(this, this.player);
        this.addChild(this.goal);
        this.goal.setPosition(cc.p(screenWidth * 50 / 100, screenHeight * 90 / 100));
        this.goal.scheduleUpdate();
    },


    getBrick: function(){
        this.brick = new Brick(this, this.player);
        this.brick.setPosition(cc.p(this.randomWidth(), this.randomHeight()));
        this.brick.speed = this.randomSpeed();
        this.brick.accl = 0;
        this.addChild(this.brick)
        this.brick.scheduleUpdate();
        this.brick.start();
        return this.brick;
    },

    randomSpeed: function(){
        return Math.round(Math.random() * 5) + 2;
    },

    randomWidth: function(){
        return Math.round(Math.random() * (screenWidth * 90 / 100)) + (screenWidth * (10 / 100));
    },

    randomHeight: function(){
        return Math.round(Math.random() * (screenHeight * 45 / 100)) + (screenHeight * (30 / 100));
    },
    
    randomCount: function(){
        return Math.round(Math.random() * 2) + 1;
    },
    
    onKeyDown: function(e){
        this.player.start();
    },

    countDown: function(){
        this.timeout--;
        this.countlbl.setString(parseInt(this.timeout / 60));
    },

    gameOver: function(){
        this.unscheduleUpdate();
        this.player.stop();
        for(var i = 0; i < this.brickCount; i++){
            this.bricks[i].stop();
        }

        var cf = confirm("GAME OVER \n Play Again?");

        setTimeout(function(){
            if(cf)
                location.reload();
        }, 500)
    },

    gameFinish: function(){
        this.unscheduleUpdate();
        this.player.stop();
        for(var i = 0; i < this.brickCount; i++){
            this.bricks[i].stop();
        }

        var cf = confirm("Stage Cleared! \n Total Score: " + this.generateScore());

        setTimeout(function(){
            if(cf){
                location.reload();
            }
        }, 500)
    },

    update: function(){
        this.countDown();
        if(this.timeout == 0){
            this.gameOver();
        }
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

