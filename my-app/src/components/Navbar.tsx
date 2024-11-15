import { Link } from 'react-router-dom';

interface NavbarProps {
  title?: string;
  mode?: 'light' | 'dark';
  toggleMode: () => void;
}

export default function Navbar({ title = 'NavBar', mode = 'light', toggleMode }: NavbarProps) {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`} style={{ position: 'sticky', width: '100%', top: '0', zIndex: '100' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{title}</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            {(mode === 'light') ? 'Light' : 'Dark'} mode
          </label>
          <div className={`form-check form-switch mx-2 ${(mode === 'dark') ? 'text-light' : ''}`}>
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onClick={toggleMode}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

