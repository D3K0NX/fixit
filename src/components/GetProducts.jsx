import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState('Loading products...');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const imgBaseUrl = 'https://kindimanu.alwaysdata.net/static/images/';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://kindimanu.alwaysdata.net/api/get_product_details'
        );
        setProducts(response.data || []);
        setLoading('');
      } catch (err) {
        setLoading('');
        setError('Failed to load products. Please try again later.');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center fw-bold mb-5 text-fixit-orange">Available Tools</h2>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">{loading}</span>
          </div>
        </div>
      )}

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <p className="text-center text-muted fs-5">No products available at the moment.</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
              {products.map((product) => (
                <div className="col" key={product.id || product.product_name}>
                  <div className="card h-100 shadow-product transition-all">
                    <img
                      src={`${imgBaseUrl}${product.product_photo}`}
                      className="card-img-top p-3"
                      alt={product.product_name}
                      style={{ height: '220px', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x220?text=No+Image';
                      }}
                    />
                    <div className="card-body d-flex flex-column text-center">
                      <h5 className="card-title fw-semibold mb-2">
                        {product.product_name}
                      </h5>
                      
                      <p className="card-text text-muted small flex-grow-1 mb-3">
                        {(() => {
                          const desc = product.product_description;
                          const limit = 100;
                          if (!desc) return 'Quality tool for professional use';
                          if (desc.length <= limit) return desc;

                          const lastSpace = desc.lastIndexOf(' ', limit);

                          return (lastSpace > 0 ? desc.slice(0, lastSpace) : desc.slice(0, limit)) + '...';
                        })()}
                      </p>

                      <div className="mt-auto">
                        <div className="mb-3">
                          <span className="price">
                            KSh {Number(product.product_cost).toLocaleString()}
                          </span>
                        </div>
                        <button
                          className="btn btn-primary w-100 fw-bold"
                          onClick={() =>
                            navigate('/make_payment', { state: { product } })
                          }
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GetProducts;