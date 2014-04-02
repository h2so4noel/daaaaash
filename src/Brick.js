var Brick = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile('res/images/brick.png');

		this.setAnchorPoint(0.5, 0.5)

		this.speed = 0;
		this.accl = 0;
	},

	update: function(){
		var pos = this.getPosition();
		if(pos.x > screenWidth || pos.x < 0){
			this.speed = this.speed * -1;
			this.acceleration = this.accl * -1;
		}
		this.setPosition(cc.p(pos.x + this.speed, pos.y));
		this.speed += this.accl;
	}
});