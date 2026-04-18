import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, API_BASE_URL } from '../lib/api';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const stored = localStorage.getItem('user');
  const userData = stored ? JSON.parse(stored) : null;
  const currentUser = Array.isArray(userData) && userData.length > 0 ? userData[0] : userData;

  useEffect(() => {
    if (!currentUser?.id) {
      navigate('/signin');
      return;
    }
    
    const fetchOrders = async () => {
      try {
        const response = await api.get(`/orders?user_id=${currentUser.id}`);
        setOrders(response.data || []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [currentUser?.id, navigate]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <section className="py-4">
        <div className="container">
          <div className="status-panel glass-panel">
            <div className="spinner-border text-primary mb-3" role="status" />
            <p className="mb-0">Loading orders...</p>
          </div>
        </div>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="py-4">
        <div className="container">
          <div className="empty-state glass-panel">
            <h3 className="mb-2">No orders yet</h3>
            <p className="text-muted mb-3">
              You haven't placed any orders yet. Start shopping!
            </p>
            <Link className="btn btn-primary" to="/">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4">
      <div className="container">
        <span className="section-kicker">Your Orders</span>
        <h2 className="mt-2 mb-4">Order History</h2>

        <div className="d-flex flex-column gap-3">
          {orders.map((order) => (
            <div className="glass-panel p-3" key={order.id}>
              <div className="d-flex flex-wrap gap-3 justify-content-between align-items-start">
                <div className="d-flex gap-3 flex-grow-1">
                  <div className="product-media" style={{ minHeight: '80px', width: '80px' }}>
                    <img
                      src={order.product_photo 
                        ? `${API_BASE_URL}/static/images/${order.product_photo}`
                        : 'https://via.placeholder.com/80x80?text=Order'}
                      alt={order.product_name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=Order';
                      }}
                    />
                  </div>
                  <div>
                    <h5 className="mb-1">{order.product_name}</h5>
                    <p className="text-muted mb-1 small">
                      Order #{order.id} • Qty: {order.quantity || 1}
                    </p>
                    <p className="text-muted mb-1 small">
                      {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'Recently'}
                    </p>
                    <span className="price">
                      KSh {Number(order.product_cost || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-lg-end">
                  <span className={`badge bg-${getStatusColor(order.status)} mb-2`}>
                    {order.status || 'Pending'}
                  </span>
                  {order.phone && (
                    <p className="text-muted small mb-0">
                      Paid via: {order.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Orders;