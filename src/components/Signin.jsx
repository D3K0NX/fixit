import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading('Signing you in...');

    try {
      const data = new FormData();
      data.append('email', email);
      data.append('password', password);

      const response = await axios.post(
        'https://kindimanu.alwaysdata.net/api/signin',
        data
      );

      setLoading('');

      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      setLoading('');
      setError(err.response?.data?.message || err.message || 'Connection error');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-product mt-5">
            <div className="card-body p-4 p-md-5">
              <h2 className="text-center fw-bold mb-4 text-fixit-orange">Sign In</h2>

              {loading && <div className="alert alert-info text-center">{loading}</div>}
              {error && <div className="alert alert-danger text-center">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-medium">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                  Sign In
                </button>
              </form>

              <p className="text-center mt-4 mb-0">
                Don't have an account?{' '}
                <Link to="/signup" className="text-fixit-orange fw-medium">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;