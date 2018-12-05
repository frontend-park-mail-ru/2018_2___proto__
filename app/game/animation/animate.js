function sprite(options) {
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

function animate(options) {
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
	spriteImage.src = `../sprites/${options.image_name}.png`;
	console.log(spriteImage.width.valueOf());
	console.log(spriteImage.height.valueOf());

	// Create sprite
	animationSprite = sprite({
		context: options.canvas.getContext("2d", { aplha: true }),
		pos_x: options.pos_x,
		pos_y: options.pos_y,
		width: spriteImage.width.valueOf(),
		height: spriteImage.height.valueOf(),
		image: spriteImage,
		numberOfFrames: options.numberOfFrames,
		ticksPerFrame: options.ticksPerFrame,
	});
}

function draw(options) {
	const that = { ...options };
	that.context = that.canvas.getContext("2d", { aplha: true });
	const spriteImage = new Image();
	spriteImage.src = `../sprites/${options.image_name}.png`;

	spriteImage.onload = () => {
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

function clear(options) {
	const that = { ...options };
	that.context = that.canvas.getContext("2d", { aplha: true });
	that.context.clearRect(
		that.pos_x,
		that.pos_y,
		that.width,
		that.height,
	);
}

function stopAnimation(id) {
	window.cancelAnimationFrame(id);
}

// some code for testing
const bg = document.getElementById("background");
bg.width = 1000;
bg.height = 600;

const heroes = document.getElementById("idleAnimation");
heroes.width = 1000;
heroes.height = 600;

draw({
	canvas: bg, // passing the canvas for rendering
	image_name: "full-bg",
	pos_x: 0, // coords of the sprite"s top left point
	pos_y: 0,
	width: 1920, // size of the image
	height: 1080,
});

animate({
	canvas: heroes, // passing the canvas for rendering
	image_name: "knight_idle_right",
	pos_x: 500, // coords of the sprite"s top left point
	pos_y: 100,
	width: 4406, // size of the spritestrip
	height: 322,
	numberOfFrames: 12, // amount of frames in spritestrip
	ticksPerFrame: 2, // speed of animation, more is slower
});

animate({
	canvas: heroes,
	image_name: "wiz_idle_left",
	pos_x: 0,
	pos_y: 100,
	width: 2248,
	height: 368,
	numberOfFrames: 10,
	ticksPerFrame: 2,
});

clear({
	canvas: bg,
	pos_x: 0, // coords of the sprite"s top left point
	pos_y: 0,
	width: 1920, // size of the image
	height: 1080,
});
