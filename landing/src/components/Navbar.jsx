import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          📚 Документация
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Документы
          </Link>
          <Link 
            to="/bookmarks" 
            className={`nav-link ${location.pathname === '/bookmarks' ? 'active' : ''}`}
          >
            Закладки
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;