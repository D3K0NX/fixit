import React from 'react';

const Skeleton = ({ count = 4 }) => (
  <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
    {Array.from({ length: count }).map((_, i) => (
      <div className="col" key={i}>
        <div className="card h-100" style={{ borderRadius: '16px', overflow: 'hidden' }}>
          <div 
            className="skeleton" 
            style={{ height: '200px', width: '100%' }} 
          />
          <div className="card-body">
            <div className="skeleton mb-2" style={{ height: '14px', width: '60px' }} />
            <div className="skeleton mb-2" style={{ height: '20px', width: '80%' }} />
            <div className="skeleton mb-3" style={{ height: '16px', width: '90%' }} />
            <div className="skeleton" style={{ height: '28px', width: '100px' }} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;