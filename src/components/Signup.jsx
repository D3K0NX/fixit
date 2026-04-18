import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading('Creating your account...');

    try {
      const data = new FormData();
      data.append('username', username);
      data.append('email', email);
      data.append('phone', phone);
      data.append('password', password);

      await api.post('/signup', data);
      navigate('/signin');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading('');
    }
  };

  return (
    <section className="auth-layout">
      <div className="container">
        <div className="auth-panel">
          <div className="row g-0">
            <div className="col-lg-5">
              <div className="auth-side h-100">
                <span className="eyebrow">New account</span>
                <h1 className="mt-3 mb-3">Create a profile built for repeat buyers and admins.</h1>
                <p className="mb-4 text-white-50">
                  The new layout makes onboarding clearer and keeps the storefront visually consistent from first visit to checkout.
                </p>
                <ul className="mb-0 text-white-50">
                  <li>Simple account setup with local phone number support.</li>
                  <li>Direct path into the refreshed catalog after registration.</li>
                  <li>Centralized API endpoint configuration for easier maintenance.</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="auth-form-wrap">
                <span className="auth-badge">Join Fixit</span>
                <h2 className="mt-3 mb-2">Create Account</h2>
                <p className="text-muted mb-4">Set up your details to start browsing and paying faster.</p>

                {loading && <div className="alert alert-info">{loading}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Choose a username"
                      required
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="254712345678"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Create a secure password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 py-3" disabled={Boolean(loading)}>
                    Create Account
                  </button>
                </form>

                <p className="mb-0 mt-4 text-muted">
                  Already registered?{' '}
                  <Link to="/signin" className="fw-semibold">
                    Sign in
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
