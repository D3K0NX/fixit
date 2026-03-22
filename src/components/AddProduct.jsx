import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/signin');
    }
  }, [navigate]);

  const [product_name, setProductName] = useState('');
  const [product_description, setProductDescription] = useState('');
  const [product_cost, setProductCost] = useState('');
  const [product_photo, setProductPhoto] = useState(null);

  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading('Adding product... Please wait');

    try {
      const data = new FormData();
      data.append('product_name', product_name);
      data.append('product_description', product_description);
      data.append('product_cost', product_cost);
      if (product_photo) {
        data.append('product_photo', product_photo);
      }

      const response = await axios.post(
        'https://kindimanu.alwaysdata.net/api/add_product',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setLoading('');
      setSuccess(response.data.message || 'Product added successfully!');

      // Reset form
      setProductName('');
      setProductDescription('');
      setProductCost('');
      setProductPhoto(null);
    } catch (err) {
      setLoading('');
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to add product. Please try again.'
      );
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">
          <div className="card shadow-product border-0">
            <div className="card-header bg-dark text-white text-center py-3">
              <h3 className="mb-0 fw-bold text-fixit-orange">Add New Tool / Product</h3>
            </div>

            <div className="card-body p-4 p-md-5">
              {loading && (
                <div className="alert alert-info text-center mb-4">
                  {loading}
                  <div className="spinner-border spinner-border-sm ms-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="alert alert-danger text-center mb-4">{error}</div>
              )}

              {success && (
                <div className="alert alert-success text-center mb-4">{success}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Product Name *</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="e.g. Cordless Drill 20V"
                    required
                    value={product_name}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Description *</label>
                  <textarea
                    className="form-control form-control-lg"
                    rows="4"
                    placeholder="Key features, specifications, what makes it special..."
                    required
                    value={product_description}
                    onChange={(e) => setProductDescription(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Price (KSh) *</label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    placeholder="12500"
                    min="1"
                    required
                    value={product_cost}
                    onChange={(e) => setProductCost(e.target.value)}
                  />
                </div>

                <div className="mb-5">
                  <label className="form-label fw-semibold">Product Photo *</label>
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    accept="image/*"
                    required
                    onChange={(e) => setProductPhoto(e.target.files[0])}
                  />
                  <small className="text-muted mt-1 d-block">
                    Recommended: clear product photo on white/light background
                  </small>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 fw-bold"
                  disabled={loading}
                >
                  {loading ? 'Uploading...' : 'Add Product'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;