import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import '../css/cart.css';

const CartSidebar = () => {
    const {
        cartItems,
        isCartOpen,
        toggleCart,
        removeFromCart,
        updateQuantity,
        getCartTotal
    } = useCart();

    const handleCheckout = () => {
        const message = `Hello! I'd like to place an order:%0A%0A${cartItems.map(item => `- ${item.name} x${item.quantity} ($${item.price * item.quantity})`).join('%0A')}%0A%0ATotal: $${getCartTotal()}`;
        window.open(`https://wa.me/919744566541?text=${message}`, '_blank');
    };

    if (!isCartOpen) return null;

    return (
        <div className="cart-sidebar-overlay">
            <div className="cart-sidebar">
                {/* Header */}
                <div className="cart-sidebar-header">
                    <h2 className="cart-sidebar-title">Your Cart</h2>
                    <button onClick={toggleCart} className="cart-sidebar-close">
                        <X size={28} />
                    </button>
                </div>

                {/* Items */}
                <div className="cart-items-container">
                    {cartItems.length === 0 ? (
                        <p className="cart-empty-msg">Your cart is empty.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.img} alt={item.name} className="cart-item-img" />
                                <div className="cart-item-details">
                                    <h4 className="cart-item-name">{item.name}</h4>
                                    <p className="cart-item-price">${item.price}</p>
                                </div>
                                <div className="cart-item-actions">
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="qty-btn"><Minus size={14} /></button>
                                        <span className="qty-display">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="qty-btn"><Plus size={14} /></button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="cart-footer">
                    <div className="cart-total">
                        <span>Total:</span>
                        <span className="total-amount">${getCartTotal()}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0}
                        className="checkout-btn"
                    >
                        Checkout on WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;
