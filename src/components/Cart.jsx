import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../lib/api';

const Cart = () => {
  const navigate = useNavigate();

  const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };

  const [cartItems, setCartItems] = React.useState(getCart());

  const updateQuantity = (index, delta) => {
    const newCart = [...cartItems];
    newCart[index].quantity = Math.max(1, (newCart[index].quantity || 1) + delta);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartItems(newCart);
  };

  const removeItem = (index) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartItems(newCart);
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.product_cost || 0) * (item.quantity || 1),
    0
  );

  const itemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  if (cartItems.length === 0) {
    return (
      <section className="py-4">
        <div className="container">
          <div className="empty-state glass-panel">
            <h3 className="mb-2">Your cart is empty</h3>
            <p className="text-muted mb-3">
              Browse our products and add items to your cart.
            </p>
            <Link className="btn btn-primary" to="/">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const handleCheckout = () => {
    const firstItem = cartItems[0];
    navigate('/make_payment', { state: { product: firstItem, cart: cartItems, total } });
  };

  return (
    <section className="py-4">
      <div className="container">
        <span className="section-kicker">Your Cart</span>
        <h2 className="mt-2 mb-4">Shopping Cart ({itemCount} items)</h2>

        <div className="row g-4">
          <div className="col-lg-8">
            {cartItems.map((item, index) => (
              <div className="product-card p-3 mb-3" key={index}>
                <div className="d-flex gap-3">
                  <div className="product-media" style={{ minHeight: '120px', width: '120px' }}>
                    <img
                      src={`${API_BASE_URL}/static/images/${item.product_photo}`}
                      alt={item.product_name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/120x120?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="mb-1">{item.product_name}</h5>
                        <p className="text-muted mb-2 small">
                          {item.product_description || 'Quality tool for professional use.'}
                        </p>
                        <span className="price">
                          KSh {Number(item.product_cost || 0).toLocaleString()}
                        </span>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeItem(index)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="d-flex align-items-center gap-3 mt-3">
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-dark"
                          onClick={() => updateQuantity(index, -1)}
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity || 1}</span>
                        <button
                          className="btn btn-sm btn-outline-dark"
                          onClick={() => updateQuantity(index, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="glass-panel p-4">
              <h4 className="mb-3">Order Summary</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({itemCount} items)</span>
                <span>KSh {total.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong className="price">KSh {total.toLocaleString()}</strong>
              </div>
              <button
                className="btn btn-primary w-100 mb-2"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              <button
                className="btn btn-outline-dark w-100"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;