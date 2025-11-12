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
            <li className="menu-item"><NavLink to="/news">News</NavLink></li>
            <li className="menu-item"><NavLink to="/live-cameras">Live cameras</NavLink></li>
            <li className="menu-item"><NavLink to="/photos">Photos</NavLink></li>
            <li className="menu-item"><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
