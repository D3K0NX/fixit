import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-center py-5 my-5">
      <h1 className="display-1 fw-bold text-fixit-orange">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="lead text-muted mb-5">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary btn-lg px-5">
        Back to Shop
      </Link>
    </div>
  );
};

export default NotFound;