import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const stored = localStorage.getItem('user');
  const userData = stored ? JSON.parse(stored) : null;
  const user = Array.isArray(userData) && userData.length > 0 ? userData[0] : userData;
  const isLoggedIn = !!user;

  const displayName = user?.username || 
                     (user?.email ? user.email.split('@')[0] : 'User');

  const getCartCount = () => {
    const cart = localStorage.getItem('cart');
    if (!cart) return 0;
    try {
      const items = JSON.parse(cart);
      return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    } catch {
      return 0;
    }
  };

  const cartCount = getCartCount();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixit-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-3" to="/">
          <span className="brand-mark">FX</span>
          <span>
            <span className="brand-title text-white">Fixit</span>
            <span className="brand-subtitle">Tools. Hardware. Fast checkout.</span>
          </span>
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
              <NavLink className="nav-link fw-medium" to="/">Shop</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium" to="/about">About</NavLink>
            </li>
            {isLoggedIn && user.role === 'admin' && (
              <li className="nav-item">
                <NavLink className="nav-link fw-medium" to="/addproduct">Add Product</NavLink>
              </li>
            )}
            {isLoggedIn && user.role === 'admin' && (
              <li className="nav-item">
                <NavLink className="nav-link fw-medium" to="/admin">Admin</NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link fw-medium position-relative" to="/cart">
                Cart
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link fw-medium" to="/orders">Orders</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link fw-medium" to="/profile">Profile</NavLink>
                </li>
              </>
            )}
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span className="nav-user-pill">
                    Hi, {displayName}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm ms-2 px-3" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link fw-medium" to="/signin">Sign In</NavLink>
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