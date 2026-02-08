// scripts/ball.js

class Ball {
  constructor(gameWidth, gameHeight, soundManager) {
    this.radius = 8;
    this.position = { 
      x: gameWidth / 2, 
      y: gameHeight / 2 
    };
    this.speed = { 
      x: 3, 
      y: -3 
    };
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.soundManager = soundManager;

    this.missCount = 0; // track how many times ball falls
  }

  update(paddle, bricks, onGameOver) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // Wall collision (left/right)
    if (this.position.x - this.radius < 0 || this.position.x + this.radius > this.gameWidth) {
      this.speed.x *= -1;
      this.soundManager.play("wall");
    }

    // Wall collision (top)
    if (this.position.y - this.radius < 0) {
      this.speed.y *= -1;
      this.soundManager.play("wall");
    }

    // Paddle collision
    if (
      this.position.y + this.radius >= paddle.position.y &&
      this.position.x >= paddle.position.x &&
      this.position.x <= paddle.position.x + paddle.width
    ) {
      this.speed.y *= -1;

      // Variation based on hit point
      let hitPoint = this.position.x - (paddle.position.x + paddle.width / 2);
      this.speed.x = hitPoint * 0.1;

      this.soundManager.play("paddle");
    }

    // Ball falls below paddle
    if (this.position.y > this.gameHeight) {
      this.missCount++;
      if (this.missCount >= 3) {
        // Trigger Game Over after 3 misses
        this.soundManager.play("lose");
        if (onGameOver) onGameOver();
      } else {
        // Reset ball to center for next attempt
        this.position = { x: this.gameWidth / 2, y: this.gameHeight / 2 };
        this.speed = { x: 3, y: -3 };
      }
    }

    // Brick collision
    bricks.forEach((brick) => {
      if (
        !brick.destroyed &&
        this.position.x >= brick.x &&
        this.position.x <= brick.x + brick.width &&
        this.position.y >= brick.y &&
        this.position.y <= brick.y + brick.height
      ) {
        this.speed.y *= -1;
        brick.destroyed = true;
        this.soundManager.play("brick");
      }
    });
  }

  draw(ctx) {
    ctx.fillStyle = "#f00";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
