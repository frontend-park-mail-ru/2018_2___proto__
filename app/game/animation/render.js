
import Bus from "../../modules/bus";

export default class CanvasWrapper {
	constructor(canvas) {
		this.canvas = canvas;
		// this.canvas_width = width;
		// this.canvas_height = height;
		// this.canvas.width = width;
		// this.canvas.height = height;
	}

	animate(options, action) {
		console.log(options.pos_x, options.pos_y);
		this.action = action;
		let animationSprite;
		[, this.side] = options.image_name.split("_");
		const animationName = `${this.side}Animation`;

		function gameLoop() {
			this[animationName] = window.requestAnimationFrame(gameLoop.bind(this));
			animationSprite.update();
			animationSprite.render();
			// console.log(animationName, this[animationName]);
		}

		// Create sprite sheet
		const spriteImage = new Image(options.width, options.height);
		// Load sprite sheet
		spriteImage.addEventListener("load", gameLoop.bind(this));
		spriteImage.src = `/public/sprites/${options.image_name}.png`;
		// console.log(spriteImage.width.valueOf());
		// console.log(spriteImage.height.valueOf());

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

	draw(options, { src_x = 0, src_y = 0 } = {}) {
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
				src_x,
				src_y,
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
		// console.log(that);
		that.context.clearRect(
			that.pos_x,
			that.pos_y,
			that.width,
			that.height,
		);
	}

	clearCanvas() {
		this.clear({
			pos_x: 0,
			pos_y: 0,
			width: this.canvas.width,
			height: this.canvas.height,
		});
	}

	_stopAnimation() {
		const animationName = `${this.side}Animation`;
		// console.log(animationName, " stopped");
		window.cancelAnimationFrame(this[animationName]);
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
				} else if (this.action === "attack" || this.action === "die") {
					this._stopAnimation();
					console.log("stopping...");
					if (this.action === "attack") {
						setTimeout(() => {
							Bus.emit("animate", {
								side: this.side,
								action: "idle",
							});
						}, 1340);
					}
				} else { frameIndex = 0; }
				// frameIndex = 0; }
			}
		};

		that.render = () => {
			// Clear the canvas
			this.clearCanvas();
			/*
 			that.context.clearRect(
				that.pos_x,
				that.pos_y,
				that.pos_x + that.width / numberOfFrames,
				that.pos_y + that.height,
			);
			*/

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
