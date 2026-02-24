
# 🚀 Satellite Orbit & De-Orbit Simulation

A physics-based numerical simulation of satellite motion around Earth using Newtonian gravitation and atmospheric drag.
This project models orbital dynamics through time-stepped numerical integration and demonstrates:

* Stable circular orbit
* Elliptical orbit behavior
* Orbital decay due to atmospheric drag
* Satellite crash detection

The simulation translates real-world orbital mechanics equations into computational form using Python.

---

# 📖 Project Overview

This project simulates the motion of a satellite orbiting Earth by applying classical mechanics principles.
At every time step, the simulation:

1. Computes gravitational acceleration toward Earth.
2. Computes atmospheric drag opposing motion.
3. Updates satellite velocity using total acceleration.
4. Updates satellite position using updated velocity.
5. Stores trajectory data for visualization.

The result is an emergent orbit produced purely from physical laws — not hardcoded circular motion.

---

# 🧠 Physics Concepts Implemented

## 1️⃣ Newton’s Law of Gravitation

[
F = \frac{GMm}{r^2}
]

Gravitational acceleration:

[
a = \frac{GM}{r^2}
]

Where:

* G = Gravitational constant
* M = Mass of Earth
* r = Distance from Earth's center

---

## 2️⃣ Circular Orbital Velocity

[
v = \sqrt{\frac{GM}{r}}
]

Used to initialize stable orbit conditions.

---

## 3️⃣ Atmospheric Drag

[
F_d = \frac{1}{2} C_d \rho A v^2
]

Where:

* Cd = Drag coefficient
* ρ = Atmospheric density
* A = Cross-sectional area
* v = Velocity magnitude

Drag acceleration is applied opposite to velocity direction.

---

## 4️⃣ Numerical Integration Method

The simulation uses **Euler’s Method** to approximate continuous motion:

Velocity update:

[
v_{new} = v_{old} + a \cdot dt
]

Position update:

[
x_{new} = x_{old} + v \cdot dt
]

This method enables time-stepped simulation of orbital dynamics.

---

# ⚙️ Simulation Parameters

* Initial altitude: 300 km
* Time step (dt): Adjustable
* Total simulation time: Adjustable
* Drag parameters configurable

The satellite will:

* Maintain stable orbit (if velocity is correct)
* Enter elliptical orbit (if velocity slightly modified)
* Crash into Earth (if energy insufficient or drag high)

---

# 📊 Output

The program generates:

* 2D trajectory plot of satellite motion
* Earth rendered to scale
* Crash detection when altitude ≤ Earth radius

---

# 🛠 Technologies Used

* Python 3
* NumPy (numerical computation)
* Matplotlib (visualization)

---

# ▶️ How To Run

### 1️⃣ Clone Repository

```
git clone https://github.com/username/satellite-orbit-simulator.git
```

### 2️⃣ Install Dependencies

```
pip install -r requirements.txt
```

### 3️⃣ Run Simulation

```
python orbit_sim.py
```

---

# 🔬 What This Project Demonstrates

* Application of physics equations in programming
* Numerical simulation of real-world systems
* Orbital stability analysis
* Modeling of energy imbalance and decay
* Structured scientific coding practices

---

# 📈 Possible Extensions

* Altitude-dependent atmospheric density model
* Runge-Kutta (RK4) integration for higher accuracy
* 3D orbital mechanics
* Real satellite data integration
* Thrust maneuver simulation
* Orbital energy analysis

---

# 🎓 Educational Value

This project bridges:
Physics → Mathematics → Programming → Simulation
It demonstrates how theoretical equations can be converted into working computational models — a foundational skill in aerospace engineering, space research, and scientific computing.

---

# 👩‍💻 Author
Bhoomi Rathore 
B.Tech CSE Student

# 📜 License

This project is for educational and learning purposes.

