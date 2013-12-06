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
		if (self.loopFrames) {
			self.frame = 0;
		} else {
			self.frame--;
		}
		if (self.resetFrames) {
			self.frames = self.defaultFrames;
		}
	};
	
	self.animate = function() {
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