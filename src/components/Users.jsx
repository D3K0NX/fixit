import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const user = Array.isArray(storedUser) ? storedUser[0] : storedUser;

    if (!user) {
      navigate('/signin');
      return;
    }

    if (user.role === 'user') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <section className="py-4">
      <div className="container">
        <div className="admin-card">
          <div className="section-heading">
            <span className="section-kicker">Admin</span>
            <h2>Users</h2>
            <p>This section is still a placeholder, but the navigation and page treatment are now consistent with the rest of the site.</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-4">
              <div className="admin-sidebar">
                <button type="button" onClick={() => navigate('/admin')}>Overview</button>
                <button type="button" onClick={() => navigate('/admin/users')}>Users</button>
                <button type="button" onClick={() => navigate('/admin/update_product')}>Update Product</button>
                <button type="button" onClick={() => navigate('/addproduct')}>Add Product</button>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="admin-placeholder">
                <div>
                  <h3 className="mb-2">User management view not implemented yet</h3>
                  <p className="text-muted mb-0">
                    The route is preserved so existing navigation keeps working. The next step would be wiring it to a user-list endpoint if one exists.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Users;
