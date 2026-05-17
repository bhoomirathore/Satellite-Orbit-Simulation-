console.log("script.js loaded");

async function runSimulation() {
    console.log("runSimulation() called");

    const altitudeKm = parseFloat(document.getElementById("altitudeInput").value);
    const velocity = parseFloat(document.getElementById("velocityInput").value);
    const rho = parseFloat(document.getElementById("rhoInput").value);

    const altitude = altitudeKm * 1000;
    const url = `/simulate?altitude=${altitude}&velocity=${velocity}&rho=${rho}`;

    console.log("Calling API:", url);

    try {
        const response = await fetch(url);
        console.log("Fetch completed with status:", response.status);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        const x = data.x;
        const y = data.y;

        const canvas = document.getElementById("orbitCanvas");
        const ctx = canvas.getContext("2d");

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Earth
        ctx.beginPath();
        ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();

        // Scale orbit points to fit the canvas.
        let maxR = 0;
        for (let i = 0; i < x.length; i++) {
            const r = Math.sqrt(x[i] * x[i] + y[i] * y[i]);
            if (r > maxR) maxR = r;
        }

        const scale = 250 / maxR;

        const scaledPoints = [];
        for (let i = 0; i < x.length; i++) {
            scaledPoints.push({
                x: centerX + x[i] * scale,
                y: centerY + y[i] * scale
            });
        }

        ctx.beginPath();
        ctx.strokeStyle = "white";

        for (let i = 0; i < scaledPoints.length; i++) {
            if (i === 0) {
                ctx.moveTo(scaledPoints[i].x, scaledPoints[i].y);
            } else {
                ctx.lineTo(scaledPoints[i].x, scaledPoints[i].y);
            }
        }

        ctx.stroke();

        let index = 0;

        function animateSatellite() {

            // Redraw Earth + orbit (static background)
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Earth
            ctx.beginPath();
            ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
            ctx.fillStyle = "blue";
            ctx.fill();

            // Orbit
            ctx.beginPath();
            ctx.strokeStyle = "white";

            for (let i = 0; i < scaledPoints.length; i++) {
                if (i === 0) {
                    ctx.moveTo(scaledPoints[i].x, scaledPoints[i].y);
                } else {
                    ctx.lineTo(scaledPoints[i].x, scaledPoints[i].y);
                }
            }

            ctx.stroke();

            // Satellite
            ctx.beginPath();
            ctx.arc(
                scaledPoints[index].x,
                scaledPoints[index].y,
                5,
                0,
                2 * Math.PI
            );
            ctx.fillStyle = "red";
            ctx.fill();

            index++;

            if (index >= scaledPoints.length) {
                index = 0;
            }

            requestAnimationFrame(animateSatellite);
        }

        animateSatellite();
    } catch (error) {
        console.error("Simulation failed:", error);
    }
}

window.runSimulation = runSimulation;

document.addEventListener("DOMContentLoaded", () => {
    const launchButton = document.getElementById("launchButton");

    if (!launchButton) {
        console.error("Launch button not found");
        return;
    }

    launchButton.addEventListener("click", runSimulation);
    console.log("Launch button listener attached");
});
