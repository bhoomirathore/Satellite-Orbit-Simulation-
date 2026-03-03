async function runSimulation() {

    const response = await fetch("/simulate");
    const data = await response.json();

    const x = data.x;
    const y = data.y;

    const canvas = document.getElementById("orbitCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw Earth
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();

    // Find max distance to scale properly
    let maxR = 0;
    for (let i = 0; i < x.length; i++) {
        const r = Math.sqrt(x[i]*x[i] + y[i]*y[i]);
        if (r > maxR) maxR = r;
    }

    const scale = 250 / maxR; // scale orbit to fit nicely

    ctx.beginPath();
    ctx.strokeStyle = "white";

    for (let i = 0; i < x.length; i++) {

        const scaledX = centerX + x[i] * scale;
        const scaledY = centerY + y[i] * scale;

        if (i === 0) {
            ctx.moveTo(scaledX, scaledY);
        } else {
            ctx.lineTo(scaledX, scaledY);
        }
    }

    ctx.stroke();
}