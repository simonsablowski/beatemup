function SoundAsset(object) {
	var self = this;
	self.object = object;
	
	self.construct = function() {
		self.sound = new Audio();
		self.sound.src = self.object.fileName;
	};
	
	self.play = function() {
		self.sound.play();
	};
	
	self.construct();
}