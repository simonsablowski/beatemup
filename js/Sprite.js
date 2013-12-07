function Sprite(image, defaultFrames) {
	var self = this;
	self.image = image;
	self.defaultFrames = defaultFrames;
	self.frames = null;
	self.resetFrames = true;
	self.loopFrames = true;
	
	self.construct = function() {
		self.reset();
	};
	
	//TODO: needs improvement
	self.changeFrames = function(frames, resetFrames, loopFrames) {
		self.frames = frames;
		self.resetFrames = resetFrames;
		self.loopFrames = loopFrames;
	};
	
	//TODO: needs improvement
	self.reset = function() {
		if (self.loopFrames || self.resetFrames) {
			self.frame = 0;
		}
		if (self.resetFrames) {
			self.frames = self.defaultFrames;
		}
	};
	
	//TODO: needs improvement
	self.animate = function() {
		//FIXME: quickfix
		if (self.frames[self.frame] === undefined) {
			self.frame = 0;
		}
		self.image.sx = self.frames[self.frame].x;
		self.image.sy = self.frames[self.frame].y;
		
		self.frame++;
		if (self.frame == self.frames.length) {
			self.reset();
		}
	};
	
	self.move = function(position) {
		self.image.x = position.x;
		self.image.y = position.y;
	};
	
	self.construct();
}