export class Renderer {
	constructor(canvas) {
		this.context = canvas.getContext('2d');
		this.width = canvas.width;
		this.height = canvas.height;
	}

	clear(color = 'black') {
		this.context.fillStyle = color;
		this.context.fillRect(0, 0, this.width, this.height);
	}

	drawImage(image, x, y) {
		this.context.drawImage(image, x, y);
	}

	drawImagePart(image, sx, sy, width, height, x, y) {
		if (width > 0 && height > 0) {
			this.context.drawImage(image, sx, sy, width, height, x, y, width, height);
		}
	}

	drawCentered(image, y) {
		this.drawImage(image, Math.round((this.width - image.width) / 2), y);
	}

	// Draws one cell of a sprite sheet, optionally mirrored horizontally.
	drawSprite(image, [column, row], width, height, x, y, mirrored = false) {
		const context = this.context;
		context.save();
		if (mirrored) {
			context.translate(x + width, y);
			context.scale(-1, 1);
		} else {
			context.translate(x, y);
		}
		context.drawImage(image, column * width, row * height, width, height, 0, 0, width, height);
		context.restore();
	}

	drawText(text, y = this.height / 2) {
		const context = this.context;
		context.font = 'bold 24px arial, helvetica, sans-serif';
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.lineWidth = 4;
		context.strokeStyle = 'black';
		context.fillStyle = 'white';
		context.strokeText(text, this.width / 2, y);
		context.fillText(text, this.width / 2, y);
	}
}
