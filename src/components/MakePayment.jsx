import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api, IMAGE_BASE_URL } from '../lib/api';

const MakePayment = () => {
  const [loading, setLoading] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  if (!product) {
    return (
      <div className="container py-5">
        <div className="empty-state glass-panel">
          <h3 className="mb-2">No product selected</h3>
          <p className="text-muted mb-3">Choose an item from the catalog before starting payment.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')} type="button">
            Back to shop
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading('Processing payment...');
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      data.append('phone', phone);
      data.append('amount', product.product_cost);

      const response = await api.post('/mpesa_payment', data);
      setSuccess(response.data.message || 'Payment initiated. Check your phone.');
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Payment failed');
    } finally {
      setLoading('');
    }
  };

  return (
    <section className="py-4">
      <div className="container">
        <div className="payment-card">
          <div className="section-heading">
            <span className="section-kicker">Checkout</span>
            <h2>Complete your purchase</h2>
            <p>Review the selected product and trigger your M-Pesa payment request.</p>
          </div>

          <div className="payment-product mb-4">
            <div className="payment-product-image">
              <img
                src={`${IMAGE_BASE_URL}${product.product_photo}`}
                alt={product.product_name}
                onError={(event) => {
                  event.target.src = 'https://via.placeholder.com/320x240?text=No+Image';
                }}
              />
            </div>

            <div>
              <span className="product-chip mb-3">Ready to purchase</span>
              <h3 className="mb-2">{product.product_name}</h3>
              <p className="text-muted mb-3">
                {product.product_description || 'Reliable item selected from the Fixit catalog.'}
              </p>
              <div className="d-flex flex-wrap gap-3 align-items-center">
                <span className="price">
                  KSh {Number(product.product_cost || 0).toLocaleString()}
                </span>
                <span className="text-muted">Payment prompt will be sent to your phone.</span>
              </div>
            </div>
          </div>

          {loading && <div className="alert alert-info">{loading}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit} className="glass-panel p-4">
            <div className="mb-4">
              <label className="form-label fw-semibold">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                placeholder="254712345678"
                required
                pattern="254[17]\\d{8}"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              <div className="form-text">Use the M-Pesa number that should receive the payment prompt.</div>
            </div>

            <div className="d-flex flex-column flex-md-row gap-3">
              <button type="submit" className="btn btn-primary px-4 py-3" disabled={Boolean(loading)}>
                Pay with M-Pesa
              </button>
              <button className="btn btn-outline-dark px-4 py-3" onClick={() => navigate('/')} type="button">
                Back to products
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MakePayment;
