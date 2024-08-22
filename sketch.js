let leftPaddle, rightPaddle;
let ball;
let leftScore = 0, rightScore = 0;
let bgColor = 0;

function setup() {
  createCanvas(600, 400);
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
  ball = new Ball();
}

function draw() {
  background(bgColor);
  
  leftPaddle.display();
  rightPaddle.display();
  leftPaddle.update();
  rightPaddle.update();
  leftPaddle.checkEdges();
  rightPaddle.checkEdges();
  
  ball.display();
  ball.update();
  ball.checkPaddle(leftPaddle);
  ball.checkPaddle(rightPaddle);
  
  drawScore();
}

function drawScore() {
  textSize(32);
  fill(255);
  text(leftScore, 32, 40);
  text(rightScore, width - 64, 40);
}

function keyPressed() {
  if (key === 'w') {
    leftPaddle.move(-10);
  } else if (key === 's'){
    leftPaddle.move(10);
  } else if (keyCode === UP_ARROW) {
    rightPaddle.move(-10);
  } else if (keyCode === DOWN_ARROW) {
    rightPaddle.move(10);
  } else if (key === 'b') {
    bgColor = color(random(255), random(255), random(255));
  }
}

function keyReleased() {
  if (key === 'w' || key === 's') {
    leftPaddle.stop();
  } else if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
    rightPaddle.stop();
  }
}

class Paddle {
  constructor(isLeft) {
    this.w = 20;
    this.h = 100;
    this.y = height / 2 - this.h / 2;
    this.x = isLeft ? 0 : width - this.w;
    this.ydir = 0;
    this.isLeft = isLeft;
  }
    
  display() {
    rect(this.x, this.y, this.w, this.h);
  }
    
  move(steps) {
    this.ydir = steps;
  }
    
  stop() {
    this.ydir = 0;
  }
    
  update() {
    this.y += this.ydir;
  }
    
  checkEdges() {
    if (this.y < 0) {
      this.y = 0;
    } else if (this.y > height - this.h) {
      this.y = height - this.h;
    }
  }
}
  
class Ball {
  constructor() {
    this.r = 12;
    this.reset();
  }
  
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xspeed = random(3, 5) * (random(1) > 0.5 ? 1 : -1);
    this.yspeed = random(3, 5) * (random(1) > 0.5 ? 1 : -1);
  }
  
  display() {
    ellipse(this.x, this.y, this.r * 2);
  }
  
  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    
    if (this.y < 0 || this.y > height) {
      this.yspeed*= -1;
    }
    
    if (this.x < 0) {
      rightScore++;
      this.reset();
    } else if (this.x > width) {
      leftScore++;
      this.reset();
    }
  }
  
  checkPaddle(paddle) {
    if (this.y > paddle.y && this.y < paddle.y + paddle.h) {
      if (this.x - this.r < paddle.x + paddle.w && this.x + this.r > paddle.x) {
        this.xspeed *= -1;
        this.xspeed *= 1.1;
        this.yspeed *= 1.1;
        this.x = paddle.isLeft ? paddle.x + paddle.w + this.r : paddle.x - this.r;
      }
    }
  }
}