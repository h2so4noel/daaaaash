var Goal = cc.Sprite.extend({
	ctor: function(gameLayer, player){
		this._super();
		this.initWithFile('res/images/goal.png');

		this.setAnchorPoint(0.5, 0.5)
	},

	animation: function(){
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile('res/images/goal');
		//
		//
		animation.setDelayPerUnit(0.3);
		return cc.RepeatForever.create(cc.Animate.create(animation));
	}
});