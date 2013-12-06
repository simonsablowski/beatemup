function AssetManager(objects) {
	var self = this;
	self.objects = objects;
	self.assets = [];
	
	self.construct = function() {
		self.load();
	};
	
	self.load = function() {
		for (var key in self.objects) {
			var object = self.objects[key];
			var extension = object.fileName.split('.').pop();
			switch (extension) {
				case 'gif':
				case 'jpg':
				case 'png':
					var asset = new ImageAsset(object);
					break;
				case 'mp3':
				case 'wav':
					var asset = new SoundAsset(object);
					break;
				default:
					var asset = null;
			}
			self.assets[key] = asset;
		}
	};
	
	self.get = function(key) {
		return self.assets[key];
	};
	
	self.construct();
}