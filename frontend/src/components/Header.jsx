import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <NavLink to="/" className="branding">
          <img src="/images/logo.png" alt="logo" className="logo" />
          <div className="logo-type">
            <h1 className="site-title">Company Name</h1>
            <small className="site-description">tagline goes here</small>
          </div>
        </NavLink>

        <nav className="main-navigation">
          <ul className="menu">
            <li className="menu-item"><NavLink to="/">Home</NavLink></li>
            <li className="menu-item"><NavLink to="/News">Tendencias</NavLink></li>
            <li className="menu-item"><NavLink to="/LiveCameras">Capitales</NavLink></li>
            <li className="menu-item"><NavLink to="/Contacts">Nosotros</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
