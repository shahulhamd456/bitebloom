'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../../css/gallery.css';

const Gallery = () => {
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

    if (loading) {
        return <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>Loading gallery...</div>;
    }

    return (
        <main className="page-container">
            <div className="container">
                <div className="section-header">
                    <h1 className="section-title">Our Creations</h1>
                    <p className="ppp">A visual feast of our finest bakes.</p>
                </div>

                <div className="row g-4">
                    {galleryItems.map((item) => (
                        <div className="col-md-6 col-lg-3" key={item.id}>
                            <Link href={`/gallery/${item.id}`} className="gallery-card-link" style={{ textDecoration: 'none' }}>
                                <div className="gallery-card">
                                    <img
                                        src={item.src}
                                        alt={item.category}
                                        className="gallery-img"
                                    />
                                    <div className="gallery-label">
                                        <span style={{ fontSize: '18px', fontWeight: '600', color: '#FFF' }}>{item.category}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Gallery;
