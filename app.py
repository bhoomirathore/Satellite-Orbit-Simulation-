from flask import Flask, request, jsonify , render_template
from orbit_sim import simulate_orbit

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/simulate")
def simulate():

    altitude = float(request.args.get("altitude", 300000))
    velocity_factor = float(request.args.get("velocity", 1))
    rho = float(request.args.get("rho", 1e-12))

    x_positions, y_positions, crash_time = simulate_orbit(
        altitude,
        velocity_factor,
        rho
    )

    return jsonify({
        "x": x_positions,
        "y": y_positions,
        "crash_time": crash_time
    })

if __name__ == "__main__":
    app.run(debug=True)