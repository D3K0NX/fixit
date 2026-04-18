import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="empty-state glass-panel">
          <span className="eyebrow mb-3">404</span>
          <h1 className="display-font mb-3">Page not found</h1>
          <p className="lead text-muted mb-4">
            The page you requested doesn&apos;t exist or the route has changed.
          </p>
          <Link to="/" className="btn btn-primary px-4 py-3">
            Back to shop
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
