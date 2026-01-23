'use client';

import React, { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import { useProducts } from '../../../context/ProductContext';
import { ShoppingBag, CreditCard } from 'lucide-react';
import gsap from 'gsap';
import '../../../css/product-detail.css';

const ProductDetail = () => {
    const { products } = useProducts();
    const params = useParams();
    const id = params?.id;
    const router = useRouter(); // Replaces useNavigate
    const { addToCart, toggleCart } = useCart();
    const containerRef = useRef(null);

    const product = products.find(p => p.id === parseInt(id));

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(containerRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
            );
        }
    }, [id]);

    if (!product) {
        return (
            <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
                <h2>Product not found</h2>
                <button className="button" onClick={() => router.push('/products')}>Back to Menu</button>
            </div>
        );
    }

    const handleBuyNow = () => {
        addToCart(product);
        toggleCart(); // Open cart sidebar to simulating "proceeding to checkout"
    };

    const [quantity, setQuantity] = React.useState(1);

    const handleQuantityChange = (type) => {
        if (type === 'inc') setQuantity(q => q + 1);
        if (type === 'dec') setQuantity(q => Math.max(1, q - 1));
    };

    const handleAddToCart = () => {
        // Mock adding multiple times or update context to accept qty
        for (let i = 0; i < quantity; i++) addToCart(product);
    };

    return (
        <div className="product-detail">
            <div className="container">
                <div className="product-detail-container" ref={containerRef}>
                    <div className="product-image-col">
                        <div className="product-image-backdrop"></div>
                        <div className="product-image-container">
                            <img src={product.img} alt={product.title} />
                        </div>
                    </div>
                    <div className="product-info-col">
                        <span className="product-category-badge">{product.category || "Specialty"}</span>
                        <h1 className="product-detail-title">{product.title}</h1>

                        <div className="product-meta">
                            <div className="product-detail-price">${product.price.toFixed(2)}</div>
                            <div className="product-rating">★★★★★ <span className="review-count">(24 Reviews)</span></div>
                        </div>

                        <p className="product-detail-description">
                            {product.description || "Ideally balanced sweetness and texture. Made with premium organic ingredients for a guilt-free indulgence."}
                        </p>

                        {/* Quantity Selector */}
                        <div className="quantity-wrapper">
                            <span className="qty-label">Quantity:</span>
                            <div className="detail-qty-controls">
                                <button onClick={() => handleQuantityChange('dec')}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => handleQuantityChange('inc')}>+</button>
                            </div>
                        </div>

                        <div className="product-actions">
                            <button className="btn-add-cart" onClick={handleAddToCart}>
                                <ShoppingBag size={20} />
                                Add to Cart
                            </button>
                            <button className="btn-buy-now" onClick={handleBuyNow}>
                                <CreditCard size={20} />
                                Buy Now
                            </button>
                        </div>

                        <div className="product-extra-info">
                            <div className="info-item">
                                <strong>Ingredients:</strong> Organic flour, natural sugar, free-range eggs, premium butter.
                            </div>
                            <div className="info-item">
                                <strong>Allergens:</strong> Contains gluten, dairy, and eggs.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
