'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { Plus } from 'lucide-react';
import '../css/products.css';

import Link from 'next/link';

const Products = ({ hideHeader = false }) => {
    const { addToCart } = useCart();
    const { products: allProducts } = useProducts();
    const products = allProducts.slice(0, 4);

    return (
        <section className="Products">
            <div className="container">
                {!hideHeader && (
                    <>
                        <h1 className="product-title">Our Product</h1>
                        <p className="ppp">It is a long established fact that a reader will be distracted by the readable content of
                            a page when looking at its layout. The point of using Lorem Ipsum</p>
                    </>
                )}
                <div className="row g-4"> {/* Added g-4 for better spacing */}
                    {products.map((product) => (
                        <div className="col-md-6 col-lg-3 col-6" key={product.id}>
                            <div className="product-card">
                                <Link href={`/products/${product.id}`} className="img-wrapper">
                                    <img src={product.img} alt={product.title} />
                                </Link>
                                <div className="card-info" style={{ textAlign: 'center', marginBottom: '15px' }}>
                                    <h4 className="ph5">
                                        <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                                            {product.title}
                                        </Link>
                                    </h4>
                                    <p style={{ color: '#DF7E5D', fontWeight: 'bold', fontSize: '18px' }}>${product.price.toFixed(2)}</p>
                                </div>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="product-add-btn"
                                >
                                    <Plus size={18} /> Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
