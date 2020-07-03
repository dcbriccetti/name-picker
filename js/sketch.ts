declare const p5;

enum State { Picking, Picked, Normal}

class NameCard {
    private p: any;
    private pg: any;
    private name: any;
    private phoneticName: any;
    private hue: any;
    private position: any;
    private rotations: any;
    private rotationΔs: any;
    private state: State;

    constructor(p, pg, name, phoneticName) {
        this.p = p;
        this.pg = pg;
        this.name = name;
        this.phoneticName = phoneticName;
        this.hue = p.random(0, 340);
        this.position = p.createVector(p.random(-p.width / 2, p.width / 2),
          p.random(-p.height / 2, p.height / 2), p.random(0, -500));
        this.rotations = p.createVector(p.random(0, p.TWO_PI), p.random(0, p.TWO_PI), p.random(0, p.TWO_PI));
        const MAX_ROT_Δ = .02;
        this.rotationΔs = p.createVector(p.random(0, MAX_ROT_Δ), p.random(0, MAX_ROT_Δ), p.random(0, MAX_ROT_Δ));
        this.state = State.Normal
    }

    draw() {
        const p = this.p
        const pg = this.pg;
        p.push();
        pg.background(this.hue, 100, 40);
        pg.fill(255);
        pg.textSize(45);
        pg.text(this.name, 10, 40);
        p.texture(pg);
        p.translate(this.position.x, this.position.y, this.position.z);
        p.rotateX(this.rotations.x);
        p.rotateY(this.rotations.y);
        p.rotateX(this.rotations.z);
        switch (this.state) {
            case State.Normal:
                this.rotations.x = (this.rotations.x + this.rotationΔs.x) % p.TWO_PI;
                this.rotations.y = (this.rotations.y + this.rotationΔs.y) % p.TWO_PI;
                this.rotations.z = (this.rotations.z + this.rotationΔs.z) % p.TWO_PI;
                break;
            case State.Picking:
                this.rotations.x = p.max(0, this.rotations.x - .1);
                this.rotations.y = p.max(0, this.rotations.y - .1);
                this.rotations.z = p.max(0, this.rotations.z - .1);
                this.position.x = p.max(0, this.position.x - 5);
                this.position.y = p.max(0, this.position.y - 5);
                const MAX_Z = 500;
                this.position.z = p.min(MAX_Z, this.position.z + 5);
                if (this.rotations.x === 0 && this.rotations.y === 0 && this.rotations.z === 0 &&
                  this.position.x === 0 && this.position.y === 0 && this.position.z === MAX_Z) {
                    this.state = State.Picked;
                }
                break;
            case State.Picked:
                break;
        }
        p.plane(200, 50);
        p.pop();
    }

    pick() {
        this.state = State.Picking;
    }
}
new p5(p => {
    let picker;
    let pg;

    p.setup = () => {
        p.colorMode(p.HSB);
        p.createCanvas(400, 500, p.WEBGL).parent('#canvas');
        pg = p.createGraphics(200, 50);
        pg.colorMode(p.HSB);
        picker = new Picker(p, pg);
    }

    p.draw = () => {
        p.background(0);
        picker.cardSpace.forEach(card => card.draw());
    }
})