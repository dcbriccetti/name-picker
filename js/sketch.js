const picker = new Picker();
let pg;

class NameCard {
    constructor(name) {
        this.name = name;
        this.hue = random(0, 340);
        this.position = createVector(random(-width / 2, width / 2),
            random(-height / 2, height / 2), random(0, -500));
        this.rotations = createVector(random(0, TWO_PI), random(0, TWO_PI), random(0, TWO_PI));
        const MAX_ROT_Δ = .02;
        this.rotationΔs = createVector(random(0, MAX_ROT_Δ), random(0, MAX_ROT_Δ), random(0, MAX_ROT_Δ));
        this.States = {NORMAL: 1, PICKING: 2, PICKED: 3};
        this.state = this.States.NORMAL;
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
        switch (this.state) {
            case this.States.NORMAL:
                this.rotations.x = (this.rotations.x + this.rotationΔs.x) % TWO_PI;
                this.rotations.y = (this.rotations.y + this.rotationΔs.y) % TWO_PI;
                this.rotations.z = (this.rotations.z + this.rotationΔs.z) % TWO_PI;
                break;
            case this.States.PICKING:
                this.rotations.x = max(0, this.rotations.x - .1);
                this.rotations.y = max(0, this.rotations.y - .1);
                this.rotations.z = max(0, this.rotations.z - .1);
                this.position.x = max(0, this.position.x - 5);
                this.position.y = max(0, this.position.y - 5);
                const MAX_Z = 500;
                this.position.z = min(MAX_Z, this.position.z + 5);
                if (this.rotations.x === 0 && this.rotations.y === 0 && this.rotations.z === 0 &&
                    this.position.x === 0 && this.position.y === 0 && this.position.z === MAX_Z) {
                    this.state = this.States.PICKED;
                }
                break;
            case this.States.PICKED:
                break;
        }
        plane(200, 50);
        pop();
    }

    pick() {
        this.state = this.States.PICKING;
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
    picker.cardSpace.forEach(card => card.draw());
}
