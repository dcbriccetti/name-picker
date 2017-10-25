const picker = new Picker();

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(255);
    translate(width / 2, height / 2);
    if (picker.started) {
        drawNames(picker.hat);
    }
}

function drawNames(names) {
    names.map((name, i) => {
        const angle = TWO_PI / names.length * i + frameCount / 10;
        const x = Math.cos(angle);
        const y = Math.sin(angle);
        fill(0);
        textSize(map(x, -1, 1, 14, 32));
        text(name, x * 50, y * 200);
    });
}