'use client';

import React, { useState, useEffect } from 'react';
import { useProducts } from '../../../context/ProductContext';
import Link from 'next/link';

// Icons
const EditIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const TrashIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const XIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

import { useSearchParams } from 'next/navigation';

// ... (other imports)

export default function AdminProductsPage() {
    const { products, deleteProduct, categories } = useProducts();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [maxPrice, setMaxPrice] = useState(50);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    // Initialize Max Price
    useEffect(() => {
        if (products.length > 0) {
            const max = Math.max(...products.map(p => p.price));
            setMaxPrice(max);
        }
    }, [products]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id);
        }
    };

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    // Filter Logic
    const filteredProducts = products.filter(product => {
        if (product.price > maxPrice) return false;

        // Search Filter
        if (searchQuery) {
            const matchesSearch = product.title.toLowerCase().includes(searchQuery) ||
                product.category?.toLowerCase().includes(searchQuery);
            if (!matchesSearch) return false;
        }

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

    return (
        <div style={{ paddingBottom: '50px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '42px', color: '#DF7E5D', fontFamily: '"Cookie", cursive' }}>All Products</h1>
                <Link href="/admin/products/add" style={{
                    backgroundColor: '#DF7E5D',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    + Add New
                </Link>
            </div>

            <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 40px)', alignItems: 'flex-start', flexDirection: 'column' }}>
                {/* Mobile Filter Toggle */}
                <button
                    className="d-lg-none button"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    style={{ backgroundColor: '#333', color: 'white', width: '100%', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', border: 'none' }}
                >
                    {showMobileFilters ? 'Hide Filters' : 'Filter Products'}
                </button>

                <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 40px)', width: '100%', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {/* Sidebar Filters */}
                    <aside style={{
                        width: 'clamp(250px, 100%, 250px)',
                        flexShrink: 0,
                        position: 'relative',
                        display: showMobileFilters ? 'block' : 'none'
                    }} className="d-lg-block">
                        <div style={{ marginBottom: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.03)' }}>
                            <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#333', fontFamily: 'Inter, sans-serif' }}>Filter by Category</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {categories.map((cat, index) => (
                                    <li key={index} style={{ marginBottom: '10px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#666', fontSize: '15px', fontFamily: 'Inter, sans-serif' }}>
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => handleCategoryChange(cat)}
                                                style={{ accentColor: '#DF7E5D', width: '16px', height: '16px' }}
                                            />
                                            {cat}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.03)' }}>
                            <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#333', fontFamily: 'Inter, sans-serif' }}>Price Range</h3>
                            <input
                                type="range"
                                min="0"
                                max={50} // Or dynamic max
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                style={{ width: '100%', accentColor: '#DF7E5D', cursor: 'pointer', marginBottom: '10px' }}
                            />
                            <div style={{ color: '#666', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
                                Max Price: ${maxPrice}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div style={{ flex: 1, minWidth: '300px' }}>

                        {/* Active Filters Display */}
                        {(selectedCategories.length > 0 || maxPrice < 50) && (
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                                {selectedCategories.map(cat => (
                                    <div key={cat} onClick={() => handleCategoryChange(cat)} style={{
                                        backgroundColor: '#333', color: 'white', padding: '5px 12px', borderRadius: '20px',
                                        fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'Inter, sans-serif'
                                    }}>
                                        {cat} <XIcon />
                                    </div>
                                ))}
                                <div style={{
                                    border: '1px solid #ddd', color: '#666', padding: '5px 12px', borderRadius: '20px',
                                    fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'Inter, sans-serif'
                                }}>
                                    Max: ${maxPrice}
                                </div>
                                <button onClick={() => { setSelectedCategories([]); setMaxPrice(50); }} style={{
                                    background: 'transparent', border: 'none', color: '#DF7E5D', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'Inter, sans-serif'
                                }}>
                                    Clear All
                                </button>
                            </div>
                        )}

                        {/* Logic: If filters active -> Show Grid. If no filters -> Show Sections */}

                        {selectedCategories.length === 0 ? (
                            /* SECTIONS VIEW */
                            <div>
                                {categories.map(category => {
                                    // Filter logic for sections (respecting price still)
                                    const categoryProducts = products.filter(p => {
                                        if (p.price > maxPrice) return false; // Respect price filter in sections too

                                        const cat = p.category || '';
                                        if (category === 'Cupcakes') return cat.includes('Cupcakes');
                                        if (category === 'Artisan Breads') return cat.includes('Bread');
                                        if (category === 'Cookies') return cat.includes('Cookies');
                                        if (category === 'Gluten Free') return cat.includes('Special') || cat.includes('GF');
                                        if (category === 'Pastries') return cat.includes('Pastry');
                                        return cat === category;
                                    });

                                    if (categoryProducts.length === 0) return null;

                                    return (
                                        <div key={category} style={{ marginBottom: '50px' }}>
                                            <h2 style={{
                                                fontFamily: '"Cookie", cursive',
                                                color: '#DF7E5D',
                                                fontSize: '36px',
                                                marginBottom: '20px',
                                                borderBottom: '2px solid #e0e0e0',
                                                paddingBottom: '10px'
                                            }}>
                                                {category}
                                            </h2>

                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                                                {categoryProducts.map(product => (
                                                    <ProductCard key={product.id} product={product} handleDelete={handleDelete} />
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            /* GRID VIEW (Filtered) */
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} handleDelete={handleDelete} />
                                ))}
                                {filteredProducts.length === 0 && (
                                    <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: '#999', fontFamily: 'Inter, sans-serif' }}>
                                        No products found matching these filters.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            );
}

            // Helper Component for Card to avoid duplication
            const ProductCard = ({product, handleDelete}) => (
            <div style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s',
                position: 'relative'
            }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
                <div style={{ height: '180px', backgroundColor: '#f9f9f9', position: 'relative' }}>
                    <img src={product.img} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', margin: 0, fontFamily: 'Inter, sans-serif' }}>{product.title}</h3>
                        <span style={{ backgroundColor: '#FFFDD0', color: '#734F96', padding: '4px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: '600', fontFamily: 'Inter, sans-serif' }}>
                            ${product.price ? product.price.toFixed(2) : '0.00'}
                        </span>
                    </div>
                    <p style={{ color: '#888', fontSize: '12px', marginBottom: '15px', height: '36px', overflow: 'hidden', lineHeight: '1.5', fontFamily: 'Inter, sans-serif' }}>
                        {product.description || 'No description available.'}
                    </p>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <Link href={`/admin/products/edit/${product.id}`} style={{
                            flex: 1,
                            backgroundColor: '#fff',
                            color: '#363740',
                            textAlign: 'center',
                            padding: '10px',
                            borderRadius: '50px',
                            textDecoration: 'none',
                            fontSize: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            fontFamily: 'Inter, sans-serif',
                            border: '1px solid #dde2ff',
                            transition: 'all 0.2s ease',
                            fontWeight: 500
                        }}
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f0f0f0'; }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fff'; }}
                        >
                            <EditIcon /> Edit
                        </Link>
                        <button onClick={() => handleDelete(product.id)} style={{
                            flex: 1,
                            backgroundColor: '#FFF0F1',
                            color: '#D1293D',
                            border: 'none',
                            padding: '10px',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            fontSize: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 500,
                            transition: 'all 0.2s ease'
                        }}
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FFE5E7'; }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFF0F1'; }}
                        >
                            <TrashIcon /> Delete
                        </button>
                    </div>
                </div>
            </div>
            );
