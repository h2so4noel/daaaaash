var GameLayer = cc.LayerColor.extend({
    init: function() {
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
        this.brick1 = new Brick();
        this.addChild(this.brick1);
        this.brick1.setPosition(cc.p(screenWidth * 10 / 100, screenHeight * 40 / 100));
        this.brick1.speed = 10;
        this.brick1.accl = 0;

        this.brick2 = new Brick();
        this.addChild(this.brick2);
        this.brick2.setPosition(cc.p(screenWidth * 90 / 100, screenHeight * 60 / 100));
        this.brick2.speed = -8;
        this.brick2.accl = -0;

        this.brick1.scheduleUpdate();
        this.brick2.scheduleUpdate();
    },

    createGoal: function(){
        this.goal = new Goal();
        this.addChild(this.goal);
        this.goal.setPosition(cc.p(screenWidth * 50 / 100, screenHeight * 85 / 100));
    },

    onKeyDown: function(e){
        this.player.start();
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

