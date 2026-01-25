'use client';

import React, { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import { useProducts } from '../../../context/ProductContext';
import Link from 'next/link'; // Added for sidebar navigation
import { ShoppingBag, CreditCard } from 'lucide-react';
import gsap from 'gsap';
import '../../../css/product-detail.css';
import '../../../css/shop.css'; // Import shop styles for layout and sidebar

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

    const [showMobileFilters, setShowMobileFilters] = React.useState(false);

    // Categories for sidebar
    const categories = ["Cupcakes", "Artisan Breads", "Cookies", "Gluten Free", "Pastries"];

    return (
        <div className="product-detail">
            <div className="shop-header-bg">
                <div className="container">
                    <div style={{ textAlign: 'center' }}>
                        <h1 className="shop-title">Shop</h1>

                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '50px' }}>
                {/* Mobile Navigation Toggle */}
                <button
                    className="d-lg-none button"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    style={{ width: '100%', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                >
                    {showMobileFilters ? 'Hide Menu' : 'Show Menu'}
                </button>

                {/* Mobile Overlay Backdrop */}
                <div
                    className={`shop-overlay ${showMobileFilters ? 'active' : ''}`}
                    onClick={() => setShowMobileFilters(false)}
                ></div>

                {/* Sidebar - Mobile Only */}
                <aside className={`shop-sidebar ${showMobileFilters ? 'active' : ''} d-lg-none`}>
                    {/* Close Button Mobile */}
                    <div className="d-lg-none" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                        <button onClick={() => setShowMobileFilters(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#333' }}>
                            {/* Close Icon SVG */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    {/* Navigation Links (Mobile Only) */}
                    <div className="filter-section">
                        <h3 className="filter-title">Menu</h3>
                        <ul className="category-list">
                            <li className="category-item"><Link href="/" className="category-label" style={{ textDecoration: 'none' }}>Home</Link></li>
                            <li className="category-item"><Link href="/offers" className="category-label" style={{ textDecoration: 'none' }}>Offers</Link></li>
                            <li className="category-item"><Link href="/custom-orders" className="category-label" style={{ textDecoration: 'none' }}>Custom</Link></li>
                            <li className="category-item"><Link href="/gallery" className="category-label" style={{ textDecoration: 'none' }}>Gallery</Link></li>
                            <li className="category-item"><Link href="/about" className="category-label" style={{ textDecoration: 'none' }}>About</Link></li>
                            <li className="category-item"><Link href="/contact" className="category-label" style={{ textDecoration: 'none' }}>Contact</Link></li>
                        </ul>
                        <div style={{ margin: '20px 0', borderBottom: '1px solid #eee' }}></div>
                    </div>

                    <div className="filter-section">
                        <h3 className="filter-title">Categories</h3>
                        <ul className="category-list">
                            <li className="category-item">
                                <Link href="/products" className="category-label" style={{ textDecoration: 'none' }}>
                                    All Products
                                </Link>
                            </li>
                            {categories.map((cat, index) => (
                                <li key={index} className="category-item">
                                    <Link href={`/products?category=${encodeURIComponent(cat)}`} className="category-label" style={{ textDecoration: 'none' }}>
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <div className="product-detail-container" ref={containerRef} style={{ margin: 0, width: '100%' }}>
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
