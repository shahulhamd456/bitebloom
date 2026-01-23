'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useProducts } from '../context/ProductContext';

const SearchIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;

export default function AdminSearch() {
    const { products } = useProducts();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Search State
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const searchInputRef = useRef(null);
    const searchContainerRef = useRef(null);
    const suggestionsListRef = useRef(null);

    // Initial search term sync
    useEffect(() => {
        const currentSearch = searchParams.get('search');
        if (currentSearch) setSearchTerm(currentSearch);
    }, [searchParams]);

    // Handle outside click to close search
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowSearch(false);
                setSuggestions([]);
                setActiveIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            const params = new URLSearchParams(searchParams);
            params.set('search', searchTerm);
            router.push(`${pathname}?${params.toString()}`);
            setShowSearch(false);
            setSuggestions([]);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setActiveIndex(-1);
        if (value.trim()) {
            const lowerValue = value.toLowerCase();
            const matches = products.filter(p =>
                (p.title && p.title.toLowerCase().includes(lowerValue)) ||
                (p.name && p.name.toLowerCase().includes(lowerValue))
            ).sort((a, b) => {
                const aTitle = (a.title || a.name || '').toLowerCase();
                const bTitle = (b.title || b.name || '').toLowerCase();
                const aStarts = aTitle.startsWith(lowerValue);
                const bStarts = bTitle.startsWith(lowerValue);
                if (aStarts && !bStarts) return -1;
                if (!aStarts && bStarts) return 1;
                return aTitle.localeCompare(bTitle);
            });
            setSuggestions(matches);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (product) => {
        router.push(`/admin/products/edit/${product.id}`);
        setShowSearch(false);
        setSearchTerm('');
        setSuggestions([]);
    };

    const handleKeyDown = (e) => {
        if (suggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(prev => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            e.preventDefault();
            handleSuggestionClick(suggestions[activeIndex]);
        }
    };

    // Scroll active item into view
    useEffect(() => {
        if (activeIndex >= 0 && suggestionsListRef.current) {
            const activeElement = suggestionsListRef.current.children[activeIndex];
            if (activeElement) {
                activeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }
    }, [activeIndex]);

    return (
        <div style={{ position: 'relative' }} ref={searchContainerRef}>
            <button
                onClick={() => { setShowSearch(!showSearch); setTimeout(() => searchInputRef.current?.focus(), 100); }}
                style={{
                    border: 'none',
                    background: 'white',
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    transition: 'transform 0.2s',
                    transform: showSearch ? 'scale(1.1)' : 'scale(1)'
                }}
            >
                <SearchIcon />
            </button>

            {/* Search Popup Window */}
            {showSearch && (
                <div style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '320px',
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                    border: '1px solid #f0f0f0',
                    zIndex: 1000
                }}>
                    <form onSubmit={handleSearch}>
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            style={{
                                width: '100%',
                                padding: '12px 15px',
                                borderRadius: '12px',
                                border: '1px solid #ddd',
                                outline: 'none',
                                marginBottom: suggestions.length > 0 ? '15px' : '0',
                                fontSize: '14px'
                            }}
                        />
                    </form>

                    {suggestions.length > 0 && (
                        <ul ref={suggestionsListRef} style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '250px', overflowY: 'auto' }}>
                            {suggestions.map((product, index) => (
                                <li
                                    key={product.id}
                                    onClick={() => handleSuggestionClick(product)}
                                    style={{
                                        padding: '10px',
                                        borderBottom: '1px solid #f9f9f9',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        borderRadius: '10px',
                                        transition: 'background 0.2s',
                                        backgroundColor: index === activeIndex ? '#f0f0f0' : 'transparent'
                                    }}
                                    onMouseEnter={() => setActiveIndex(index)}
                                >
                                    <img src={product.img} alt={product.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                                            {/* Highlight Match logic */}
                                            {(() => {
                                                if (!searchTerm.trim()) return product.title;
                                                const parts = product.title.split(new RegExp(`(${searchTerm})`, 'gi'));
                                                return parts.map((part, i) => (
                                                    <span key={i} style={{
                                                        color: part.toLowerCase() === searchTerm.toLowerCase() ? '#DF7E5D' : 'inherit',
                                                        fontWeight: part.toLowerCase() === searchTerm.toLowerCase() ? 'bold' : 'normal'
                                                    }}>
                                                        {part}
                                                    </span>
                                                ));
                                            })()}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#999' }}>${product.price}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
