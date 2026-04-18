import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const stored = localStorage.getItem('user');
  const userData = stored ? JSON.parse(stored) : null;
  const currentUser = Array.isArray(userData) && userData.length > 0 ? userData[0] : userData;

  useEffect(() => {
    if (!currentUser?.id) {
      navigate('/signin');
      return;
    }
    
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/profile?user_id=${currentUser.id}`);
        setUser(response.data);
      } catch {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [currentUser?.id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const formData = new FormData();
      formData.append('user_id', currentUser.id);
      formData.append('username', user.username);
      formData.append('phone', user.phone);

      await api.put('/profile', formData);
      setMessage('Profile updated successfully');
      
      localStorage.setItem('user', JSON.stringify([{ ...currentUser, username: user.username, phone: user.phone }]));
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="py-4">
        <div className="container">
          <div className="status-panel glass-panel">
            <div className="spinner-border text-primary mb-3" role="status" />
            <p className="mb-0">Loading profile...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="glass-panel p-4">
              <span className="section-kicker">Your Account</span>
              <h2 className="mt-2 mb-4">Profile Settings</h2>

              {message && (
                <div className="alert alert-success mb-4">{message}</div>
              )}
              {error && (
                <div className="alert alert-danger mb-4">{error}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user?.username || ''}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={user?.email || ''}
                    disabled
                  />
                  <small className="text-muted">Email cannot be changed</small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={user?.phone || ''}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Role</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user?.role || 'customer'}
                    disabled
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;