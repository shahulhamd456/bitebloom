'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';
import { useProducts } from '../../../context/ProductContext';
import { Plus } from 'lucide-react';
import '../../../css/gallery-detail.css';

const GalleryDetail = () => {
    const params = useParams();
    const id = params?.id;
    const router = useRouter(); // Replaces useNavigate
    const { addToCart } = useCart();
    const { products } = useProducts();
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await fetch('/api/gallery');
                if (response.ok) {
                    const data = await response.json();
                    setGalleryItems(data);
                }
            } catch (error) {
                console.error("Failed to load gallery:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="container" style={{ paddingTop: '150px' }}>Loading...</div>;

    const item = galleryItems.find(i => i.id === parseInt(id));

    if (!item) {
        return (
            <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
                <h2>Gallery Item Not Found</h2>
                <button className="button" onClick={() => router.push('/gallery')}>Back to Gallery</button>
            </div>
        );
    }

    // Find products matching the category
    const relatedProducts = products.filter(p => p.category === item.category);

    return (
        <main className="gallery-detail-page">
            <div className="container">
                <div className="row align-items-center mb-5">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="gallery-main-image-container">
                            <img src={item.src} alt={item.title} className="gallery-main-image" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="gallery-info-content">
                            <h1 className="gallery-detail-title">{item.title}</h1>
                            <div className="gallery-decorative-line"></div>
                            <p className="gallery-description">
                                {item.description}
                            </p>
                        </div>
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <div className="related-products-section">
                        <h3 className="related-products-title">Our {item.category} Selection</h3>
                        <div className="row">
                            {relatedProducts.map(product => (
                                <div className="col-md-6 col-lg-4" key={product.id}>
                                    <div className="product-card prpic" style={{ position: 'relative', paddingBottom: '50px' }}>
                                        <Link href={`/products/${product.id}`}>
                                            <img src={product.img} alt={product.title} style={{ cursor: 'pointer' }} />
                                        </Link>
                                        <h4 className="ph5">
                                            <Link href={`/products/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                {product.title}
                                            </Link>
                                        </h4>
                                        <p style={{ color: '#DF7E5D', fontWeight: 'bold' }}>${product.price.toFixed(2)}</p>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="button"
                                            style={{
                                                position: 'absolute',
                                                bottom: '20px',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                width: '80%',
                                                padding: '8px 0',
                                                fontSize: '14px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '5px'
                                            }}
                                        >
                                            <Plus size={16} /> Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default GalleryDetail;
