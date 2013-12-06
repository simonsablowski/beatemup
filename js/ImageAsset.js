function ImageAsset(object) {
	var self = this;
	self.object = object;
	
	self.construct = function() {
		self.image = new Image();
		self.image.src = self.object.fileName;
		self.width = self.object.width;
		self.height = self.object.height;
		self.x = self.object.x;
		self.y = self.object.y;
		self.swidth = self.object.width;
		self.sheight = self.object.height;
		self.sx = 0;
		self.sy = 0;
		self.frames = self.object.frames !== undefined ? self.object.frames : null;
	};
	
	self.construct();
}