async function runSimulation() {

    const response = await fetch("/simulate");
    const data = await response.json();

    const x = data.x;
    const y = data.y;

    const canvas = document.getElementById("orbitCanvas");
    const ctx = canvas.getContext("2d");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Earth
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();

    // Calculate scaling factor
    let maxR = 0;
    for (let i = 0; i < x.length; i++) {
        const r = Math.sqrt(x[i]*x[i] + y[i]*y[i]);
        if (r > maxR) maxR = r;
    }

    const scale = 250 / maxR;

    // Pre-scale coordinates
    const scaledPoints = [];
    for (let i = 0; i < x.length; i++) {
        scaledPoints.push({
            x: centerX + x[i] * scale,
            y: centerY + y[i] * scale
        });
    }

    let index = 0;

    function animate() {

        if (index >= scaledPoints.length) return;

        // Redraw Earth each frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();

        // Draw orbit trail
        ctx.beginPath();
        ctx.strokeStyle = "white";

        for (let i = 0; i < index; i++) {
            if (i === 0) {
                ctx.moveTo(scaledPoints[i].x, scaledPoints[i].y);
            } else {
                ctx.lineTo(scaledPoints[i].x, scaledPoints[i].y);
            }
        }

        ctx.stroke();

        // Draw moving satellite
        ctx.beginPath();
        ctx.arc(
            scaledPoints[index].x,
            scaledPoints[index].y,
            4,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = "red";
        ctx.fill();

        index++;

        requestAnimationFrame(animate);
    }

    animate();
}