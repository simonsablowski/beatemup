function Renderer(canvasWidth, canvasHeight) {
	var self = this;
	self.canvasWidth = canvasWidth;
	self.canvasHeight = canvasHeight;
	self.images = [];
	
	self.construct = function() {
		self.initializeCanvas();
	};
	
	self.initializeCanvas = function() {
		var element = document.createElement('canvas');
		element.width = self.canvasWidth;
		element.height = self.canvasHeight;
		document.getElementById('body').appendChild(element);
		self.canvas = element.getContext('2d');
	};
	
	self.addImages = function(keys) {
		for (var i = 0; i < keys.length; i++) {
			self.addImage(keys[i]);
		}
	};
	
	self.addImage = function(key) {
		self.images[key] = key;
	};
	
	self.removeImages = function(keys) {
		for (var i = 0; i < keys.length; i++) {
			self.removeImage(keys[i]);
		}
	};
	
	self.removeImage = function(key) {
		delete self.images[key];
	};
	
	self.render = function() {
		for (var key in self.images) {
			var image = images.get(key);
			self.canvas.drawImage(image.image, image.sx, image.sy, image.width, image.height, image.x, image.y, image.width, image.height);
		}
	};
	
	self.construct();
}