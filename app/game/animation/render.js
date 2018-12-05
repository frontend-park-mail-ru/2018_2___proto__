
export default class CanvasWrapper {
	constructor(canvas) {
		this.canvas = canvas;
		// this.canvas_width = width;
		// this.canvas_height = height;
		// this.canvas.width = width;
		// this.canvas.height = height;
	}

	animate(options) {
		let animationSprite;

		function gameLoop() {
			const id = window.requestAnimationFrame(gameLoop);
			animationSprite.update();
			animationSprite.render();
			return id;
		}

		// Create sprite sheet
		const spriteImage = new Image(options.width, options.height);
		// Load sprite sheet
		spriteImage.addEventListener("load", gameLoop);
		spriteImage.src = `/public/sprites/${options.image_name}.png`;
		console.log(spriteImage.width.valueOf());
		console.log(spriteImage.height.valueOf());

		// Create sprite
		animationSprite = this._sprite({
			context: this.canvas.getContext("2d", { aplha: true }),
			pos_x: options.pos_x,
			pos_y: options.pos_y,
			width: spriteImage.width.valueOf(),
			height: spriteImage.height.valueOf(),
			image: spriteImage,
			numberOfFrames: options.numberOfFrames,
			ticksPerFrame: options.ticksPerFrame,
		});
	}

	draw(options) {
		// debugger;
		/**
		 * image_name
		 * pos_x
		 * pos_y
		 * width
		 * height
		 *
		 */
		const that = { ...options };
		that.context = this.canvas.getContext("2d", { aplha: true });
		const spriteImage = new Image();
		spriteImage.src = `/public/sprites/${options.image_name}.png`;
		spriteImage.onload = () => {
			// debugger;
			that.context.drawImage(
				spriteImage,
				0,
				0,
				that.width,
				that.height,
				that.pos_x,
				that.pos_y,
				that.width,
				that.height,
			);
		};
	}

	clear(options) {
		const that = { ...options };
		that.context = this.canvas.getContext("2d", { aplha: true });
		that.context.clearRect(
			that.pos_x,
			that.pos_y,
			that.width,
			that.height,
		);
	}

	_sprite(options) {
		let frameIndex = 0;
		let tickCount = 0;
		const ticksPerFrame = options.ticksPerFrame || 0;
		const numberOfFrames = options.numberOfFrames || 1;

		const that = { ...options };
		that.update = () => {
			tickCount += 1;
			if (tickCount > ticksPerFrame) {
				tickCount = 0;
				// If the current frame index is in range
				if (frameIndex < numberOfFrames - 1) {
					// Go to the next frame
					frameIndex += 1;
				} else {
					frameIndex = 0;
				}
			}
		};

		that.render = () => {
			// Clear the canvas
			that.context.clearRect(
				that.pos_x,
				that.pos_y,
				that.pos_x + that.width / numberOfFrames,
				that.pos_y + that.height,
			);

			// Draw the animation
			that.context.drawImage(
				that.image,
				frameIndex * that.width / numberOfFrames,
				0,
				that.width / numberOfFrames,
				that.height,
				that.pos_x,
				that.pos_y,
				that.width / numberOfFrames,
				that.height,
			);
		};

		return that;
	}
}
