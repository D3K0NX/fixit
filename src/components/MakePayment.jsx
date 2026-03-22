import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MakePayment = () => {
  const [loading, setLoading] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');

  const { state } = useLocation();
  const product = state?.product;
  const navigate = useNavigate();

  const imgBaseUrl = 'https://kindimanu.alwaysdata.net/static/images/';

  if (!product) {
    return (
      <div className="container text-center py-5">
        <h3 className="text-danger">No product selected</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          Back to Shop
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading('Processing payment...');
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      data.append('phone', phone);
      // If your backend expects product info too, add it:
      // data.append('product_id', product.id || product.product_name);
      data.append('amount', product.product_cost);

      const response = await axios.post(
        'https://kindimanu.alwaysdata.net/api/mpesa_payment',
        data
      );

      setLoading('');
      setSuccess(response.data.message || 'Payment initiated! Check your phone.');

      // Optional: redirect after success
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setLoading('');
      setError(err.response?.data?.message || err.message || 'Payment failed');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">
          <div className="card shadow-product mt-4">
            <div className="card-body p-4 p-md-5">
              <h2 className="text-center fw-bold mb-4 text-fixit-orange">
                Complete Your Purchase
              </h2>

              <div className="text-center mb-4">
                <img
                  src={`${imgBaseUrl}${product.product_photo}`}
                  alt={product.product_name}
                  className="img-fluid mb-3"
                  style={{ maxHeight: '280px', objectFit: 'contain' }}
                />
                <h3 className="fw-bold">{product.product_name}</h3>
                <p className="text-muted">{product.product_description}</p>
                <h4 className="price mt-3">
                  KSh {Number(product.product_cost).toLocaleString()}
                </h4>
              </div>

              {loading && <div className="alert alert-info text-center">{loading}</div>}
              {error && <div className="alert alert-danger text-center">{error}</div>}
              {success && <div className="alert alert-success text-center">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-medium">
                    Phone Number (Format: 254XXXXXXXXX)
                  </label>
                  <input
                    type="tel"
                    className="form-control form-control-lg"
                    placeholder="254712345678"
                    required
                    pattern="254[17]\d{8}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <small className="text-muted">Lipa na M-Pesa number</small>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold">
                  Pay with M-Pesa
                </button>
              </form>

              <div className="text-center mt-4">
                <button
                  className="btn btn-dark"
                  onClick={() => navigate('/')}
                >
                  ← Back to Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;