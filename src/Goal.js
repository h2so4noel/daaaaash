var Goal = cc.Sprite.extend({
	ctor: function(gameLayer, player){
		this._super();
		this.initWithFile('res/images/goal.png');

		this.setAnchorPoint(0.5, 0.5)

		this.gameLayer = gameLayer;
		this.player = player;
	},

	animation: function(){
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile('res/images/goal');
		//
		//
		animation.setDelayPerUnit(0.3);
		return cc.RepeatForever.create(cc.Animate.create(animation));
	},

	update: function(){
		this.checkCollide();
	},

	checkCollide: function(){
		var pPos = this.player.getPosition();
		var pos = this.getPosition();
		if(Math.abs(pPos.x - pos.x) <= 50 && Math.abs(pPos.y - pos.y) <= 50){
			this.gameLayer.gameOver();
			this.unscheduleUpdate();
		}
	}
});