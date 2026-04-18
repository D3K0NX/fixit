import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../lib/api';

const QuickViewModal = ({ product, onClose, onBuyNow, onAddToCart }) => {
  const [imageError, setImageError] = useState(false);
  const [showErrorImage, setShowErrorImage] = useState(false);

  useEffect(() => {
    setShowErrorImage(false);
    setImageError(false);
  }, [product?.id]);

  if (!product) return null;

  const handleImageError = () => {
    setImageError(true);
    setShowErrorImage(true);
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-lg modal-dialog-centered" onClick={e => e.stopPropagation()}>
        <div className="modal-content glass-panel" style={{ borderRadius: '28px', overflow: 'hidden' }}>
          <div className="modal-header border-0 pb-0">
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body pt-2">
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="product-media" style={{ minHeight: '300px' }}>
                  {!showErrorImage ? (
                    <img
                      src={`${API_BASE_URL}/static/images/${product.product_photo}`}
                      alt={product.product_name}
                      style={{ width: '100%', maxHeight: '280px', objectFit: 'contain' }}
                      onError={handleImageError}
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/300x280?text=No+Image"
                      alt={product.product_name}
                      style={{ width: '100%', maxHeight: '280px', objectFit: 'contain' }}
                    />
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <span className="product-chip mb-2 d-inline-block">In stock</span>
                <h3 className="mb-2" style={{ fontSize: '1.5rem' }}>{product.product_name}</h3>
                <span className="price d-block mb-3" style={{ fontSize: '1.75rem' }}>
                  KSh {Number(product.product_cost || 0).toLocaleString()}
                </span>
                <p className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
                  {product.product_description || 'Quality tool for professional use.'}
                </p>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-primary flex-grow-1"
                    onClick={() => { onAddToCart(product); onClose(); }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-primary flex-grow-1"
                    onClick={() => { onBuyNow(product); onClose(); }}
                  >
                    Buy Now
                  </button>
                </div>
                <div className="mt-3 text-muted small">
                  <p className="mb-1">Free delivery in Nairobi</p>
                  <p className="mb-1">Quality guaranteed</p>
                  <p className="mb-0">M-Pesa payments accepted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;