import animate from './animate';

const canvas = document.getElementById('idleAnimation');
canvas.width = 1000;
canvas.height = 600;

animate({
  canvas, // passing the canvas for rendering
  pos_x: 500, // coords of the sprite's top left point
  pos_y: 0,
  width: 4406, // size of the spritestrip
  height: 322,
  image_name: 'knight_idle_right',
  numberOfFrames: 12, // amount of frames in spritestrip
  ticksPerFrame: 2, // speed of animation, more is slower
});

animate({
  canvas,
  pos_x: 0,
  pos_y: 0,
  width: 2408,
  height: 368,
  image_name: 'wiz_idle_left',
  numberOfFrames: 10,
  ticksPerFrame: 2,
});
