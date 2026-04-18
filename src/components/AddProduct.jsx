import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCost, setProductCost] = useState('');
  const [productPhoto, setProductPhoto] = useState(null);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const user = Array.isArray(storedUser) ? storedUser[0] : storedUser;

    if (!user) {
      navigate('/signin');
      return;
    }

    if (user.role !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading('Adding product...');

    try {
      const data = new FormData();
      data.append('product_name', productName);
      data.append('product_description', productDescription);
      data.append('product_cost', productCost);

      if (productPhoto) {
        data.append('product_photo', productPhoto);
      }

      const response = await api.post('/add_product', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(response.data.message || 'Product added successfully.');
      setProductName('');
      setProductDescription('');
      setProductCost('');
      setProductPhoto(null);
      event.target.reset();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to add product. Please try again.'
      );
    } finally {
      setLoading('');
    }
  };

  return (
    <section className="py-4">
      <div className="container">
        <div className="admin-card">
          <div className="section-heading">
            <span className="section-kicker">Admin tools</span>
            <h2>Add a new product</h2>
            <p>Use the shared API client and a cleaner form layout to publish new items faster.</p>
          </div>

          {loading && <div className="alert alert-info">{loading}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit} className="glass-panel p-4">
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label fw-semibold">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cordless Drill 20V"
                  required
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Key features, specifications, and best-use scenarios"
                  required
                  value={productDescription}
                  onChange={(event) => setProductDescription(event.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Price (KSh)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="12500"
                  min="1"
                  required
                  value={productCost}
                  onChange={(event) => setProductCost(event.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Product Photo</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  required
                  onChange={(event) => setProductPhoto(event.target.files?.[0] || null)}
                />
              </div>
            </div>

            <div className="mt-4 d-flex flex-column flex-md-row gap-3">
              <button type="submit" className="btn btn-primary px-4 py-3" disabled={Boolean(loading)}>
                {loading ? 'Uploading...' : 'Publish Product'}
              </button>
              <button type="button" className="btn btn-outline-dark px-4 py-3" onClick={() => navigate('/admin')}>
                Back to admin
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
