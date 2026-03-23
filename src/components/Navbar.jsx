import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const stored = localStorage.getItem('user');
  const userData = stored ? JSON.parse(stored) : null;
  const user = Array.isArray(userData) && userData.length > 0 ? userData[0] : userData;
  const isLoggedIn = !!user;

  const displayName = user?.username || 
                     (user?.email ? user.email.split('@')[0] : 'User');

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" style={{ color: '#e65100' }} to="/">
          FixIt
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/">Shop</Link>
            </li>
            {isLoggedIn && user.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link fw-medium" to="/addproduct">Add Product</Link>
              </li>
            )}
            {isLoggedIn && user.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link fw-medium" to="/admin">Admin</Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto align-items-lg-center">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white-50 fw-medium">
                    Hi, {displayName}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-warning btn-sm ms-2 px-3" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-medium" to="/signin">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary fw-bold ms-lg-3 px-4" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;