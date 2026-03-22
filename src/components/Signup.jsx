import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading('Creating your account...');

    try {
      const data = new FormData();
      data.append('username', username);
      data.append('email', email);
      data.append('phone', phone);
      data.append('password', password);

      const response = await axios.post(
        'https://kindimanu.alwaysdata.net/api/signup',
        data
      );

      setLoading('');
      setSuccess(response.data.message || 'Account created successfully!');

      navigate('/signin')

    } catch (err) {
      setLoading('');
      setError(err.response?.data?.message || err.message || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-product mt-5">
            <div className="card-body p-4 p-md-5">
              <h2 className="text-center fw-bold mb-4 text-fixit-orange">Create Account</h2>

              {loading && <div className="alert alert-info text-center">{loading}</div>}
              {error && <div className="alert alert-danger text-center">{error}</div>}
              {success && <div className="alert alert-success text-center">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-medium">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Choose a username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

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

                <div className="mb-3">
                  <label className="form-label fw-medium">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="254712345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                  Sign Up
                </button>
              </form>

              <p className="text-center mt-4 mb-0">
                Already have an account?{' '}
                <Link to="/signin" className="text-fixit-orange fw-medium">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;