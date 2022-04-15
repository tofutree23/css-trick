const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

const LEAF_COUNT = 100;
const leafArray = [];

// Render after image loaded
const petalImage = new Image();
petalImage.src = "./petal.png";
petalImage.onload = () => {
  // Make petals in leafArray
  for (let i = 0; i < LEAF_COUNT; i++) {
    leafArray.push(new Petal());
  }
  render();
};

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function render() {
  // 지나간 꽃잎들을 지워준다
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  leafArray.forEach((petal) => {
    petal.animate();
  });
  window.requestAnimationFrame(render);
}

class Petal {
  constructor() {
    this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.y = Math.random() * canvas.height * 2 - canvas.height;

    // different size of petal's width, height
    this.width = 30 + Math.random() * 15; // max width = 45
    this.height = 20 + Math.random() * 10; // max height = 30

    // perspective will be display in opacity
    this.opacity = this.width / 45;

    // different speed
    this.xSpeed = 2 + Math.random();
    this.ySpeed = 1 + Math.random();
  }

  draw = () => {
    // if petals disappeared, re-draw petals from first
    if (this.x > canvas.width || this.y > canvas.height) {
      this.x = -petalImage.width;
      // Petals y will be random..
      this.y = Math.random() * canvas.height * 2 - canvas.height;
      // Set speed again
      this.xSpeed = 2 + Math.random();
      this.ySpeed = 1 + Math.random();
    }

    ctx.globalAlpha = this.opacity;
    ctx.drawImage(petalImage, this.x, this.y, this.width, this.height);
  };

  animate = () => {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.draw();
  };
}
