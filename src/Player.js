var Player = cc.Sprite.extend({
	ctor: function(){
		this.started = false;
		this._super();
		this.initWithFile('res/images/player.png');

		this.speed = 3;
		this.accl = 0.1;
	},

	explodeAni: function(){
		var animation = new cc.Animation.create();

		for(var i = 1; i <= 25; i++){
			var temp = "bomb_" + i;
			animation.addSpriteFrameWithFile("res/images/" + temp + ".png");
		}

		animation.setDelayPerUnit(0.03);
		return cc.Animate.create(animation);
	},

	teleportAni: function(){
		var animation = new cc.Animation.create();

		for(var i = 1; i <= 10; i++){
			var temp = "teleport_" + i;
			animation.addSpriteFrameWithFile("res/images/" + temp + ".png");
		}

		animation.setDelayPerUnit(0.02);
		return cc.Animate.create(animation);
	},

	update: function(){
		if(this.speed <= 0)
			this.speed = 0;
		if(this.started == true){
			var pos = this.getPosition();
			this.setPosition(cc.p(pos.x, pos.y + this.speed));
			this.speed += this.accl;
		}
	},

	slow: function(){
		this.speed -= 2;
	},

	stop: function(){
		this.started = false;
	},

	start: function(){
		this.started = true;
	}
});