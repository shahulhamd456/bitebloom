'use client';

import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useSearchParams } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { Heart, Eye, ShoppingBag, Star, ChevronRight, X, Filter } from 'lucide-react';
import '../../css/shop.css';

const Products = () => {
    const { products, categories } = useProducts();
    const { addToCart } = useCart();

    // URL Params Logic
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortOption, setSortOption] = useState('Default Sorting');
    const [maxPrice, setMaxPrice] = useState(50);
    const [absoluteMax, setAbsoluteMax] = useState(50);
    const [minRating, setMinRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Sync URL param with state on mount or param change
    React.useEffect(() => {
        if (categoryParam) {
            setSelectedCategories([categoryParam]);
        } else {
            // Optional: Clear categories if no param? Or keep state? 
            // Better to only set if param exists to avoid wiping user manual selection if they navigate internally without params.
            // But for deep links, we want to respect the param.
            // Let's assume if param is missing, we don't force clear unless we want "All Products" link to work.
            // For now, if no param, we leave it alone (or could set to []).
        }
    }, [categoryParam]);

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    // Filter Logic
    const filteredProducts = products.filter(product => {
        // Price Filter
        if (product.price > maxPrice) return false;

        // Rating Filter
        // Default to a high rating if missing in data to avoid hiding everything unexpectedly, 
        // though we added it to data.
        const r = product.rating || 0;
        if (r < minRating) return false;

        if (selectedCategories.length === 0) return true;

        const productCat = product.category || 'Special Occasion';
        return selectedCategories.some(cat => {
            if (cat === 'Cupcakes') return productCat.includes('Cupcakes');
            if (cat === 'Artisan Breads') return productCat.includes('Bread');
            if (cat === 'Cookies') return productCat.includes('Cookies');
            if (cat === 'Gluten Free') return productCat.includes('Special') || productCat.includes('GF');
            if (cat === 'Pastries') return productCat.includes('Pastry');
            return productCat === cat;
        });
    });

    // Sort Logic
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === 'Price: Low to High') return a.price - b.price;
        if (sortOption === 'Price: High to Low') return b.price - a.price;
        return 0;
    });

    // Pagination Logic
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);

    // Initialize Max Price based on products
    React.useEffect(() => {
        if (products.length > 0) {
            const max = Math.max(...products.map(p => p.price));
            setAbsoluteMax(max);
            setMaxPrice(max);
        }
    }, [products]);

    // Reset page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategories, maxPrice, minRating, sortOption]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="shop-page">
            <header className="shop-header-bg">
                <div className="container">
                    <div style={{ textAlign: 'center' }}>
                        <h1 className="shop-title">Shop</h1>
                        <p style={{ color: '#666' }}>Home / Shop</p>
                    </div>
                </div>
            </header>

            <div className="container">
                <div className="shop-layout">
                    {/* Mobile Filter Toggle REMOVED */}

                    {/* Mobile Overlay Backdrop */}
                    <div
                        className={`shop-overlay ${showMobileFilters ? 'active' : ''}`}
                        onClick={() => setShowMobileFilters(false)}
                    ></div>

                    {/* Sidebar */}
                    <aside className={`shop-sidebar ${showMobileFilters ? 'active' : ''} d-lg-block`}>
                        {/* Close Button Mobile */}
                        <div className="d-lg-none" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                            <button onClick={() => setShowMobileFilters(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#333' }}>
                                <X size={24} />
                            </button>
                        </div>

                        {/* Navigation Links REMOVED */}


                        <div className="filter-section">
                            <h3 className="filter-title">By Categories</h3>
                            <ul className="category-list">
                                {categories.map((cat, index) => (
                                    <li key={index} className="category-item">
                                        <label className="category-label">
                                            <input
                                                type="checkbox"
                                                className="category-checkbox"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => handleCategoryChange(cat)}
                                            />
                                            {cat}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="filter-section">
                            <h3 className="filter-title">Price</h3>
                            <input
                                type="range"
                                min="0"
                                max={absoluteMax}
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                style={{ width: '100%', accentColor: '#DF7E5D', cursor: 'pointer' }}
                            />
                            <div className="filter-price-inputs" style={{ marginTop: '10px' }}>
                                Price: $0 - ${maxPrice}
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3 className="filter-title">Review</h3>
                            <div
                                className="review-stepper-container"
                                style={{ cursor: 'pointer', padding: '10px' }}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                <div style={{ flex: 1, textAlign: 'center' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px', gap: '5px' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={24}
                                                fill={i < (hoverRating || minRating) ? "#FFC107" : "#E0E0E0"}
                                                color={i < (hoverRating || minRating) ? "#FFC107" : "#E0E0E0"}
                                                onMouseEnter={() => setHoverRating(i + 1)}
                                                onClick={() => setMinRating(i + 1 === minRating ? 0 : i + 1)} // Toggle off if clicked again
                                                style={{ transition: 'all 0.2s', transform: i < (hoverRating || minRating) ? 'scale(1.1)' : 'scale(1)' }}
                                            />
                                        ))}
                                    </div>
                                    <div className="review-text">
                                        {(hoverRating || minRating) > 0 ? `${hoverRating || minRating} Stars & Up` : 'Any Rating'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main>
                        <div className="shop-controls">
                            <div className="active-filters">
                                <div className="filter-tag">
                                    Price: $0 - ${maxPrice}
                                </div>
                                {minRating > 0 && (
                                    <div className="filter-tag" onClick={() => setMinRating(0)} style={{ cursor: 'pointer' }}>
                                        {minRating}+ Stars <X size={12} />
                                    </div>
                                )}
                                {selectedCategories.map(cat => (
                                    <div className="filter-tag" key={cat} onClick={() => handleCategoryChange(cat)} style={{ cursor: 'pointer' }}>
                                        {cat} <X size={12} />
                                    </div>
                                ))}
                                {selectedCategories.length === 0 && minRating === 0 && (
                                    <span style={{ fontSize: '14px', color: '#888', marginLeft: '10px' }}> </span>
                                )}
                                <span className="results-count" style={{ marginLeft: '15px' }}>
                                    {selectedCategories.length === 0
                                        ? `Showing all ${sortedProducts.length} results`
                                        : `Showing ${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, sortedProducts.length)} of ${sortedProducts.length} results`
                                    }
                                </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <button
                                    className="custom-dropdown-trigger d-lg-none"
                                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                                    style={{ padding: '10px 15px', gap: '8px' }}
                                >
                                    Filter <Filter size={16} />
                                </button>
                                <span style={{ fontSize: '14px', color: '#666' }}>Sort by:</span>

                                <div className="custom-dropdown" style={{ position: 'relative' }}>
                                    <div
                                        className="custom-dropdown-trigger"
                                        onClick={() => setIsSortOpen(!isSortOpen)}
                                    >
                                        {sortOption}
                                        <ChevronRight size={16} style={{ transform: isSortOpen ? 'rotate(90deg)' : 'rotate(90deg)', transition: 'transform 0.2s' }} />
                                    </div>

                                    {isSortOpen && (
                                        <div className="custom-dropdown-menu">
                                            {['Default Sorting', 'Price: Low to High', 'Price: High to Low', 'Newest First'].map(option => (
                                                <div
                                                    key={option}
                                                    className={`custom-dropdown-item ${sortOption === option ? 'selected' : ''}`}
                                                    onClick={() => {
                                                        setSortOption(option);
                                                        setIsSortOpen(false);
                                                    }}
                                                >
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* SECTION VIEW (Default) */}
                        {selectedCategories.length === 0 ? (
                            <div className="sections-view">
                                {categories.map((category) => {
                                    // Filter products for this category from the ALREADY FILTERED (by price/rating) list
                                    const categoryProducts = sortedProducts.filter(p => {
                                        if (category === 'Cupcakes') return (p.category || '').includes('Cupcakes');
                                        if (category === 'Artisan Breads') return (p.category || '').includes('Bread');
                                        if (category === 'Cookies') return (p.category || '').includes('Cookies');
                                        if (category === 'Gluten Free') return (p.category || '').includes('Special') || (p.category || '').includes('GF');
                                        if (category === 'Pastries') return (p.category || '').includes('Pastry');
                                        return p.category === category;
                                    });

                                    if (categoryProducts.length === 0) return null;

                                    return (
                                        <div key={category} className="category-section" style={{ marginBottom: '50px' }}>
                                            <h2 style={{
                                                fontFamily: '"Cookie", cursive',
                                                color: '#DF7E5D',
                                                fontSize: '36px',
                                                marginBottom: '20px',
                                                borderBottom: '2px solid #FFFDD0',
                                                paddingBottom: '10px'
                                            }}>
                                                {category}
                                            </h2>
                                            <div className="row g-4">
                                                {categoryProducts.map((product, index) => {
                                                    const hasDiscount = index % 2 === 0;
                                                    const discountPercent = hasDiscount ? 30 : 0;
                                                    const oldPrice = hasDiscount ? (product.price * 1.3).toFixed(2) : null;

                                                    return (
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-6" key={product.id}>
                                                            <div className="shop-card">
                                                                <div className="card-image-wrapper">
                                                                    <Link href={`/products/${product.id}`}>
                                                                        <img src={product.img} alt={product.title} className="shop-card-img" />
                                                                    </Link>

                                                                    {hasDiscount && (
                                                                        <div className="discount-badge">-{discountPercent}%</div>
                                                                    )}

                                                                    <div className="card-overlays">
                                                                        <button className="card-action-btn" title="Add to Wishlist">
                                                                            <Heart size={18} />
                                                                        </button>
                                                                        <button className="card-action-btn" title="Quick View">
                                                                            <Eye size={18} />
                                                                        </button>
                                                                        <button className="card-action-btn" title="Add to Cart" onClick={() => addToCart(product)}>
                                                                            <ShoppingBag size={18} />
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                <div className="shop-card-details">
                                                                    <div className="shop-card-category">{product.category || 'Bakery'}</div>
                                                                    <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                                                                        <h3 className="shop-card-title">{product.title}</h3>
                                                                    </Link>

                                                                    <div className="shop-card-meta">
                                                                        <div className="shop-card-price">
                                                                            ${product.price.toFixed(2)}
                                                                            {oldPrice && <span className="old-price">${oldPrice}</span>}
                                                                        </div>
                                                                        <div className="shop-card-rating">
                                                                            ★ {product.rating || 4.5}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            /* GRID VIEW (Filtered) */
                            <div className="row g-4">
                                {currentProducts.map((product, index) => {
                                    const hasDiscount = index % 2 === 0;
                                    const discountPercent = hasDiscount ? 30 : 0;
                                    const oldPrice = hasDiscount ? (product.price * 1.3).toFixed(2) : null;

                                    return (
                                        <div className="col-xl-4 col-lg-6 col-md-6 col-6" key={product.id}>
                                            <div className="shop-card">
                                                <div className="card-image-wrapper">
                                                    <Link href={`/products/${product.id}`}>
                                                        <img src={product.img} alt={product.title} className="shop-card-img" />
                                                    </Link>

                                                    {hasDiscount && (
                                                        <div className="discount-badge">-{discountPercent}%</div>
                                                    )}

                                                    <div className="card-overlays">
                                                        <button className="card-action-btn" title="Add to Wishlist">
                                                            <Heart size={18} />
                                                        </button>
                                                        <button className="card-action-btn" title="Quick View">
                                                            <Eye size={18} />
                                                        </button>
                                                        <button className="card-action-btn" title="Add to Cart" onClick={() => addToCart(product)}>
                                                            <ShoppingBag size={18} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="shop-card-details">
                                                    <div className="shop-card-category">{product.category || 'Bakery'}</div>
                                                    <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                                                        <h3 className="shop-card-title">{product.title}</h3>
                                                    </Link>

                                                    <div className="shop-card-meta">
                                                        <div className="shop-card-price">
                                                            ${product.price.toFixed(2)}
                                                            {oldPrice && <span className="old-price">${oldPrice}</span>}
                                                        </div>
                                                        <div className="shop-card-rating">
                                                            ★ {product.rating || 4.5}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {sortedProducts.length === 0 && (
                                    <div className="col-12 text-center py-5">
                                        <h3>No products found matching your filters.</h3>
                                        <button className="button" style={{ marginTop: '20px' }} onClick={() => { setMaxPrice(50); setSelectedCategories([]); setMinRating(0); }}>Clear Filters</button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Show Pagination ONLY if filters are active */}
                        {selectedCategories.length > 0 && sortedProducts.length > itemsPerPage && (
                            <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                {currentPage > 1 && (
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: '#eee', color: '#333', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        ←
                                    </button>
                                )}

                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => paginate(i + 1)}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            border: 'none',
                                            background: currentPage === i + 1 ? '#333' : '#eee',
                                            color: currentPage === i + 1 ? '#fff' : '#333',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                {currentPage < totalPages && (
                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: '#eee', color: '#333', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        →
                                    </button>
                                )}
                            </div>
                        )}

                    </main>
                </div>
            </div>
        </div>
    );
};

export default Products;
