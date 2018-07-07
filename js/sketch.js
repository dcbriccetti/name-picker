const picker = new Picker();

function setup() {
    createCanvas(400, 500).parent('#canvas');
}

function draw() {
    background(255);
    translate(width / 4, height / 2);
    if (picker.started) {
        drawNames(picker.hat);
    }
}

function drawNames(names) {
    const angleBetweenNames = TWO_PI / names.length;
    const animationRotation = frameCount / 10;

    names.map((name, nameIndex) => {
        const angle = angleBetweenNames * nameIndex + animationRotation;
        const x = Math.cos(angle);
        const y = Math.sin(angle);
        textSize(map(x, -1, 1, 14, 32));
        text(name, x * 50, y * 200);
    });
}