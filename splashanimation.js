let nodes = [];
let dUp = true;
let bg_col = (0);

function setup() {
  
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  for (let i = 0; i < 200; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(0);
    nodes[i] = new Node(x, y, r);
  }
}

function draw() {

  // bg_col = map(mouseX, 0, width, 0, 255)
  // background(bg_col);
 
  col = map(mouseX, 0, width, 0, 50)
  for (let n of nodes) {
    n.show();
    n.move();
    // n.wiggle();
    let overlapping = false;
    for (let other of nodes) {
      if (n !== other && n.intersects(other)) {
        overlapping = true;
      }
    }
    if (overlapping) {
      n.changeColor(0);
    } else {
      n.changeColor(150);
    }
    for (let other of nodes) {
      if (n !== other && n.distance(other) < (width/20)) {
        n.draw_edge(other, col);
      }
    }
  }
}

class Node {
  constructor(x, y, r = 50) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
    this.yspeed = 4;
    this.xspeed = 5;
  }

  draw_edge(other, color) {
    line(this.x, this.y, other.x, other.y);

    stroke(color);
    strokeWeight(1);
  }

  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return (d < this.r + other.r);
  }

  distance(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d;
  }

  changeColor(bright) {
    this.brightness = bright;
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  // step() {
  //   let choice = random(0,3);
  //   if (choice == 0) {
  //     x++;
  //   }
  //   if (choice == 1) {
  //     x--;
  //   }
  //   if (choice == 2) {
  //     y++;
  //   }
  //   if (choice == 3) {
  //     y--;
  //   }
  // }

  move() {
    if (this.y >= height + 50) {
      this.yspeed *= -1;
    }
    if (this.y <= -50) {
      this.yspeed = 2 + random(-6, 6);
    }
    this.y = this.y + this.yspeed;

    if (this.x >= width + 50) {
      this.xspeed *= -1;
    }
    if (this.x <= -50) {
      this.xspeed = 3 + random(-4, 4);
    }
    this.x = this.x + this.xspeed;
  }

  show() {
    noStroke()
    strokeWeight(1);
    fill(this.brightness, 125);
    ellipse(this.x, this.y, this.r);
  }
}