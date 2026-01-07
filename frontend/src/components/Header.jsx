import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <NavLink to="/" className="branding">
          <img src="/images/logo.png" alt="logo" className="logo" />
          <div className="logo-type">
            <h1 className="site-title">Majos Weather</h1>
            <small className="site-description">App de cosultas de clima</small>
          </div>
        </NavLink>

        <nav className="main-navigation">
          <ul className="menu">
            <li className="menu-item"><NavLink to="/">Inicio</NavLink></li>
            <li className="menu-item"><NavLink to="/News">Tendencias</NavLink></li>
            <li className="menu-item"><NavLink to="/LiveCameras">Historial</NavLink></li>
            <li className="menu-item"><NavLink to="/Contact">Nosotros</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
