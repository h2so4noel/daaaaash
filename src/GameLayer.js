var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.timeout = 20 * 60;

        this._super();
        this.background = cc.Sprite.create('res/images/bg.png')
        this.background.setAnchorPoint( new cc.Point(0, 0));
        this.addChild(this.background, 0);

        this.setPosition( new cc.Point( 0, 0 ) );

        this.createPlayer();
        this.createBricks();
        this.createGoal();

        this.setKeyboardEnabled(true);
        return true;
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
        console.log(this.randomWidth());
        console.log(this.randomHeight());
        this.bricks = [];

        for(var i = 0; i < this.brickCount; i++){
            this.brick = new Brick(this, this.player);
            this.brick.setPosition(cc.p(this.randomWidth(), this.randomHeight()));
            this.brick.speed = this.randomSpeed();
            this.brick.accl = 0;
            this.addChild(this.brick)
            this.brick.scheduleUpdate();
            this.brick.start();

            this.bricks[i] = this.brick;
        }
    },

    createGoal: function(){
        this.goal = new Goal(this, this.player);
        this.addChild(this.goal);
        this.goal.setPosition(cc.p(screenWidth * 50 / 100, screenHeight * 90 / 100));
    },

    randomSpeed: function(){
        return Math.round(Math.random() * 7) + 4;
    },

    randomWidth: function(){
        return Math.round(Math.random() * (screenWidth * 90 / 100)) + (screenWidth * (10 / 100));
    },

    randomHeight: function(){
        return Math.round(Math.random() * (screenHeight * 45 / 100)) + (screenHeight * (30 / 100));
    },

    randomCount: function(){
        return Math.round(Math.random() * 5) + 1;
    },

    onKeyDown: function(e){
        this.player.start();
    },

    countDown: function(){
        this.timeout--;
    },

    gameOver: function(){
        this.player.stop();
        this.brick1.stop();
        this.brick2.stop();
    },

    update: function(){
        countDown;
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

