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
    window.requestAnimationFrame(gameLoop);
    animationSprite.update();
    animationSprite.render();
  }

  // Create sprite sheet
  const spriteImage = new Image(options.width, options.height);
  // Load sprite sheet
  spriteImage.addEventListener('load', gameLoop);
  spriteImage.src = `../sprites/${options.image_name}.png`;
  console.log(spriteImage.width.valueOf());
  console.log(spriteImage.height.valueOf());

  // Create sprite
  animationSprite = sprite({
    context: options.canvas.getContext('2d', { aplha: true }),
    pos_x: options.pos_x,
    pos_y: options.pos_y,
    width: spriteImage.width.valueOf(),
    height: spriteImage.height.valueOf(),
    image: spriteImage,
    numberOfFrames: options.numberOfFrames,
    ticksPerFrame: options.ticksPerFrame,
  });
}
