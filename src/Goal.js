var Goal = cc.Sprite.extend({
	ctor: function(gameLayer, player){
		this._super();
		this.initWithFile('res/images/goal.png');

		this.setAnchorPoint(0.5, 0.5)

		this.gameLayer = gameLayer;
		this.player = player;
	},

	update: function(){
		this.checkCollide();
	},

	checkCollide: function(){
		var pPos = this.player.getPosition();
		var pos = this.getPosition();
		if(Math.abs(pPos.x - pos.x) <= 50 && Math.abs(pPos.y - pos.y) <= 50){
			this.gameLayer.gameFinish();
			this.unscheduleUpdate();
		}
	}
});