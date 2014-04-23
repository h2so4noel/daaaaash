var Brick = cc.Sprite.extend({
	ctor: function(gameLayer, player){
		this.started = false;
		this._super();
		this.initWithFile('res/images/brick.png');

		this.speed = 0;
		this.accl = 0;

		this.gameLayer = gameLayer;
		this.player = player;
	},

	update: function(){
		this.checkCollide();
		if(this.started == true){
			var pos = this.getPosition();
			if(pos.x > screenWidth || pos.x < 0){
				this.speed = this.speed * -1;
				this.acceleration = this.accl * -1;
			}
			this.setPosition(cc.p(pos.x + this.speed, pos.y));
			this.speed += this.accl;
		}
	},

	checkCollide: function(){
		var pPos = this.player.getPosition();
		var pos = this.getPosition();
		if(Math.abs(pPos.x - pos.x) <= 50 && Math.abs(pPos.y - pos.y) <= 50){
			this.gameLayer.gameOver();
			this.unscheduleUpdate();
		}
	},

	stop: function(){
		this.started = false;
	},

	start: function(){
		this.started = true;
	}
});