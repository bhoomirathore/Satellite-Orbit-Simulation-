import numpy as np

def simulate_orbit(altitude, velocity_factor ,rho):
    
    G = 6.67430e-11                    # gravitational constant
    m_earth = 5.972e24                 # kg
    r_earth = 6.371e6                  # m  

    dt = 1
    total_time = 10000
    steps = int(total_time / dt)

    m_satellite = 1000

    # altitute 300km
    x = r_earth + altitude 
    y = 0

    # defining intial velocity
    r = np.sqrt(x**2 + y**2)
    v_circular = np.sqrt(G * m_earth / r)

    vx = 0
    vy = v_circular * velocity_factor

    x_positions = []
    y_positions = []

    crash_time = None

    Cd = 2.2    # very thin atmosphere at 300 km
    A = 10          # cross-sectional area (m^2)

    # simulation loop 
    for step in range(steps):

        # Distance from Earth center
        r = np.sqrt(x**2 + y**2)
        if r <= r_earth:
            crash_time = step* dt
            break

        # Compute gravity acceleration
        a = G * m_earth / r**2
        ax = -a * (x / r)
        ay = -a * (y / r)

        # Compute velocity magnitude
        v = np.sqrt(vx**2 + vy**2)

        # Compute drag acceleration
        drag = 0.5 * Cd * rho * A * v**2 / m_satellite

        if v != 0:
            ax_drag = -drag * (vx / v)
            ay_drag = -drag * (vy / v)
        else:
            ax_drag = 0
            ay_drag = 0

        # Total acceleration
        ax_total = ax + ax_drag
        ay_total = ay + ay_drag

        # Update velocity ONCE
        vx += ax_total * dt
        vy += ay_total * dt

        # Update position
        x += vx * dt
        y += vy * dt
    
        # Store trajectory
        x_positions.append(x)
        y_positions.append(y)

    return x_positions , y_positions, crash_time



