import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { ShoppingBag, Search as SearchIcon } from 'lucide-react';
import '../css/header.css';

const Header = () => {
    const headerRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { toggleCart, cartItems } = useCart();
    const { products } = useProducts();

    // Scroll Logic
    // Scroll Logic
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Router hooks
    const pathname = usePathname();
    const router = useRouter();

    // Search State
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const searchInputRef = useRef(null);
    const suggestionsListRef = useRef(null); // Ref for suggestions list

    const searchContainerRef = useRef(null);

    // Scroll active item into view
    useEffect(() => {
        if (activeIndex >= 0 && suggestionsListRef.current) {
            const activeElement = suggestionsListRef.current.children[activeIndex];
            if (activeElement) {
                activeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }
    }, [activeIndex]);

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
            router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
            setShowSearch(false);
            setSearchTerm('');
            setSuggestions([]);
            setActiveIndex(-1);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setActiveIndex(-1); // Reset selection on type
        if (value.trim()) {
            const matches = products.filter(p =>
                p.title.toLowerCase().includes(value.toLowerCase()) ||
                p.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(matches);
        } else {
            setSuggestions([]);
        }
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

    const handleSuggestionClick = (product) => {
        router.push(`/products/${product.id}`);
        setShowSearch(false);
        setSearchTerm('');
        setSuggestions([]);
    };

    useEffect(() => {
        // Initial entrance animation
        gsap.fromTo(
            headerRef.current,
            { opacity: 0, x: -100 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.out",
                onComplete: () => {
                    gsap.set(headerRef.current, { clearProps: "all" });
                }
            }
        );
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const isActive = (path) => pathname === path ? 'active' : '';

    return (
        <header ref={headerRef} className={!isVisible ? 'header-hidden' : ''}>
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg ">
                        <div className="container">
                            <Link className="navbar-brand" href="/"><img src="/asset/logo.svg" alt="" />BiteBloom</Link>

                            <div className="d-flex align-items-center gap-3">
                                <button className="d-lg-none" onClick={toggleCart} style={{ border: 'none', background: 'none', position: 'relative' }}>
                                    <ShoppingBag color="#FFFDD0" size={24} />
                                    {cartItems.length > 0 && <span style={{ position: 'absolute', top: -5, right: -5, background: '#1E1E1E', color: '#FFFDD0', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #DF7E5D' }}>{cartItems.length}</span>}
                                </button>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    onClick={toggleMenu}
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </div>

                            <div className={`collapse navbar-collapse justify-content-end ${isMenuOpen ? 'show' : ''}`} id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    <Link className={`nav-link ${isActive('/')}`} href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>

                                    <Link className={`nav-link ${isActive('/offers')}`} href="/offers" onClick={() => setIsMenuOpen(false)}>Offers</Link>
                                    <Link className={`nav-link ${isActive('/custom-orders')}`} href="/custom-orders" onClick={() => setIsMenuOpen(false)}>Custom</Link>
                                    <Link className={`nav-link ${isActive('/gallery')}`} href="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
                                    <Link className={`nav-link ${isActive('/about')}`} href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>

                                </div>

                                <div className="nav-li d-flex align-items-center">
                                    {/* Search Feature */}
                                    <div className="search position-relative" ref={searchContainerRef}>
                                        <button
                                            onClick={() => setShowSearch(!showSearch)}
                                            style={{ border: 'none', background: 'none', padding: 0 }}
                                        >
                                            <img src="/asset/search.svg" alt="Search" />
                                        </button>
                                        {showSearch && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '100%',
                                                right: 0,
                                                minWidth: '260px',
                                                zIndex: 10000,
                                                marginTop: '15px',
                                                background: '#fff',
                                                padding: '15px',
                                                borderRadius: '20px',
                                                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                                border: '1px solid #eee'
                                            }}>
                                                <form onSubmit={handleSearch}>
                                                    <input
                                                        ref={searchInputRef}
                                                        type="text"
                                                        placeholder="Search product..."
                                                        value={searchTerm}
                                                        onChange={handleInputChange}
                                                        onKeyDown={handleKeyDown}
                                                        autoFocus
                                                        style={{
                                                            width: '100%',
                                                            padding: '8px 12px',
                                                            borderRadius: '20px',
                                                            border: '1px solid #DF7E5D',
                                                            outline: 'none',
                                                            marginBottom: suggestions.length > 0 ? '10px' : '0'
                                                        }}
                                                    />
                                                </form>
                                                {suggestions.length > 0 && (
                                                    <ul ref={suggestionsListRef} style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '200px', overflowY: 'auto' }}>
                                                        {suggestions.map((product, index) => (
                                                            <li
                                                                key={product.id}
                                                                onClick={() => handleSuggestionClick(product)}
                                                                style={{
                                                                    padding: '8px',
                                                                    cursor: 'pointer',
                                                                    borderBottom: '1px solid #eee',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '10px',
                                                                    backgroundColor: index === activeIndex ? '#DF7E5D' : 'transparent',
                                                                    color: index === activeIndex ? '#fff' : '#333'
                                                                }}
                                                                onMouseEnter={() => setActiveIndex(index)}
                                                                onMouseLeave={() => setActiveIndex(-1)}
                                                            >
                                                                <img src={product.img} alt={product.title} style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
                                                                <span style={{ fontSize: '14px', color: 'inherit' }}>
                                                                    {(() => {
                                                                        if (!searchTerm.trim()) return product.title;
                                                                        const parts = product.title.split(new RegExp(`(${searchTerm})`, 'gi'));
                                                                        return parts.map((part, i) => (
                                                                            <span
                                                                                key={i}
                                                                                style={{
                                                                                    color: part.toLowerCase() === searchTerm.toLowerCase()
                                                                                        ? (index === activeIndex ? '#fff' : '#DF7E5D')
                                                                                        : 'inherit',
                                                                                    fontWeight: part.toLowerCase() === searchTerm.toLowerCase() ? 'bold' : 'normal'
                                                                                }}
                                                                            >
                                                                                {part}
                                                                            </span>
                                                                        ));
                                                                    })()}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="search"> <Link href="/products" onClick={() => setIsMenuOpen(false)}><img src="/asset/store.svg" alt="" /></Link></div>

                                    <div className="search"><Link href="/contact" onClick={() => setIsMenuOpen(false)}><img src="/asset/phone.svg" alt="" /></Link></div>
                                    <div className="search d-none d-lg-block">
                                        <button onClick={toggleCart} className="cart-btn-premium" style={{ border: 'none', padding: 0 }}>
                                            <ShoppingBag color="#FFFDD0" size={20} />
                                            {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
