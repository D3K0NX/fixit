import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading('Signing you in...');

    try {
      const data = new FormData();
      data.append('email', email);
      data.append('password', password);

      const response = await api.post('/signin', data);
      const user = response.data.user;

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
        return;
      }

      setError(response.data.message || 'Login failed');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Connection error');
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
                <span className="eyebrow">Welcome back</span>
                <h1 className="mt-3 mb-3">Sign in and continue shopping with less friction.</h1>
                <p className="mb-4 text-white-50">
                  Access your account, return to the catalog quickly, and complete M-Pesa purchases without repeating the basics.
                </p>
                <div className="glass-panel p-3 bg-white bg-opacity-10 border-0 shadow-none">
                  <strong className="d-block mb-2">What changed</strong>
                  <p className="mb-0 text-white-50">
                    Cleaner hierarchy, stronger spacing, and a shared API client behind the form.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="auth-form-wrap">
                <span className="auth-badge">Account access</span>
                <h2 className="mt-3 mb-2">Sign In</h2>
                <p className="text-muted mb-4">Use your registered email and password.</p>

                {loading && <div className="alert alert-info">{loading}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
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

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 py-3" disabled={Boolean(loading)}>
                    Sign In
                  </button>
                </form>

                <p className="mb-0 mt-4 text-muted">
                  Don&apos;t have an account?{' '}
                  <Link to="/signup" className="fw-semibold">
                    Create one
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

export default Signin;
