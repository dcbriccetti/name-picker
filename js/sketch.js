
const picker = new Picker();
let pg;

class NameCard {
    constructor(name) {
        this.name = name;
        this.hue = random(0, 340);
        this.position = createVector(random(-width / 2, width / 2), random(-height / 2, height / 2), random(100, -500));
        this.rotations = createVector(random(0, TWO_PI), random(0, TWO_PI), random(0, TWO_PI));
        const MAX_ROT_Δ = .01;
        this.rotationΔs = createVector(random(0, MAX_ROT_Δ), random(0, .05), random(0, .05));
    }

    draw() {
        push();
        pg.background(this.hue, 100, 40);
        pg.fill(255);
        pg.textSize(45);
        pg.text(this.name, 10, 40);
        texture(pg);
        translate(this.position.x, this.position.y, this.position.z);
        rotateX(this.rotations.x);
        rotateY(this.rotations.y);
        rotateX(this.rotations.z);
        this.rotations.x += this.rotationΔs.x;
        this.rotations.y += this.rotationΔs.y;
        this.rotations.z += this.rotationΔs.z;
        plane(200, 50);
        pop();
    }
}

function setup() {
    colorMode(HSB);
    createCanvas(400, 500, WEBGL).parent('#canvas');
    pg = createGraphics(200, 50);
    pg.colorMode(HSB);
}

function draw() {
    background(0);
    if (picker.started) {
        picker.hat.forEach(card => card.draw());
    }
}
