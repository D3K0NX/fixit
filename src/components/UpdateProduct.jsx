import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
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
            <h2>Update Product</h2>
            <p>The route is retained and styled, ready for actual edit functionality when the backend contract is available.</p>
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
                  <h3 className="mb-2">Product editing is not wired yet</h3>
                  <p className="text-muted mb-0">
                    If you want, the next pass can turn this into a full product table with edit and delete controls.
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

export default UpdateProduct;
