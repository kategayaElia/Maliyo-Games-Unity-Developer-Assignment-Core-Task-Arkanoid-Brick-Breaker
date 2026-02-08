// // scripts/paddle.js

// class Paddle {
//   constructor(gameWidth, gameHeight) {
//     this.width = 100;
//     this.height = 12;
//     this.gameWidth = gameWidth;
//     this.gameHeight = gameHeight;

//     this.position = {
//       x: gameWidth / 2 - this.width / 2,
//       y: gameHeight - this.height * 2
//     };

//     this.speed = 7;
//   }

//   moveLeft() {
//     this.position.x -= this.speed;
//     if (this.position.x < 0) this.position.x = 0;
//   }

//   moveRight() {
//     this.position.x += this.speed;
//     if (this.position.x + this.width > this.gameWidth) {
//       this.position.x = this.gameWidth - this.width;
//     }
//   }

//   draw(ctx) {
//     const third = this.width / 3;

//     // Left end (red)
//     ctx.fillStyle = "#ff0000";
//     ctx.fillRect(this.position.x, this.position.y, third, this.height);

//     // Center (white)
//     ctx.fillStyle = "#ffffff";
//     ctx.fillRect(this.position.x + third, this.position.y, third, this.height);

//     // Right end (red)
//     ctx.fillStyle = "#ff0000";
//     ctx.fillRect(this.position.x + 2 * third, this.position.y, third, this.height);
//   }
// }

// scripts/paddle.js

class Paddle {
  constructor(gameWidth, gameHeight) {
    this.width = 100;
    this.height = 12;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.position = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight - this.height * 2
    };

    this.speed = 7;
  }

  moveLeft() {
    this.position.x -= this.speed;
    if (this.position.x < 0) this.position.x = 0;
  }

  moveRight() {
    this.position.x += this.speed;
    if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }
  }

  draw(ctx) {
    const third = this.width / 3;

    // Left end (red)
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(this.position.x, this.position.y, third, this.height);

    // Center (white)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(this.position.x + third, this.position.y, third, this.height);

    // Right end (red)
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(this.position.x + 2 * third, this.position.y, third, this.height);
  }
}
