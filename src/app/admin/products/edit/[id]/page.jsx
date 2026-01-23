'use client';

import React, { useState, useEffect } from 'react';
import { useProducts } from '../../../../../context/ProductContext';
import { useRouter, useParams } from 'next/navigation';

const InputGroup = ({ label, value, onChange, type = 'text', placeholder }) => (
    <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: '#734F96', fontWeight: '600', fontSize: '16px' }}>{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{
                width: '100%',
                padding: '12px 20px',
                borderRadius: '50px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#f9f9f9',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#DF7E5D'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />
    </div>
);

const TextAreaGroup = ({ label, value, onChange, placeholder }) => (
    <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: '#734F96', fontWeight: '600', fontSize: '16px' }}>{label}</label>
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows="4"
            style={{
                width: '100%',
                padding: '15px 20px',
                borderRadius: '20px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#f9f9f9',
                fontSize: '16px',
                outline: 'none',
                resize: 'none',
                transition: 'border-color 0.3s',
                fontFamily: 'Inter, sans-serif'
            }}
            onFocus={(e) => e.target.style.borderColor = '#DF7E5D'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />
    </div>
);

export default function EditProductPage() {
    const { products, updateProduct } = useProducts();
    const router = useRouter();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: 'Cakes',
        description: ''
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [originalProduct, setOriginalProduct] = useState(null);

    useEffect(() => {
        // Find product by ID
        if (products.length > 0 && id) {
            const product = products.find(p => p.id.toString() === id.toString());
            if (product) {
                setOriginalProduct(product);
                setFormData({
                    title: product.title,
                    price: product.price,
                    category: product.category,
                    description: product.description || ''
                });
                setImagePreview(product.img);
            } else {
                // Product not found logic
            }
        }
    }, [products, id]);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!formData.title || !formData.price || !originalProduct) return;

        const updatedProduct = {
            ...originalProduct,
            title: formData.title,
            price: Number(formData.price),
            category: formData.category,
            description: formData.description,
            img: imagePreview
        };

        updateProduct(originalProduct.id, updatedProduct);
        alert('Product Updated Successfully!');
        router.push('/admin/products');
    };

    if (!originalProduct) return <div style={{ padding: '40px' }}>Loading or Product Not Found...</div>;

    return (
        <div style={{ paddingBottom: '50px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '42px', color: '#DF7E5D', fontFamily: '"Cookie", cursive' }}>Edit Product</h1>
            </div>

            <div style={{
                backgroundColor: 'white',
                borderRadius: '30px',
                padding: '40px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                display: 'flex',
                gap: '50px',
                flexWrap: 'wrap'
            }}>
                {/* Left Side: Form Fields */}
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <InputGroup
                        label="Product Name"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <InputGroup
                                label="Price ($)"
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: '#734F96', fontWeight: '600', fontSize: '16px' }}>Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px 20px',
                                        borderRadius: '50px',
                                        border: '1px solid #e0e0e0',
                                        backgroundColor: '#f9f9f9',
                                        fontSize: '16px',
                                        outline: 'none',
                                        cursor: 'pointer'
                                    }}>
                                    <option>Cakes</option>
                                    <option>Artisan Breads</option>
                                    <option>Cookies</option>
                                    <option>Pastries</option>
                                    <option>Cupscakes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <TextAreaGroup
                        label="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe the delicious details..."
                    />

                    <button
                        onClick={handleSubmit}
                        className="button"
                        style={{
                            marginTop: '10px',
                            width: '100%',
                            textAlign: 'center',
                            fontSize: '18px',
                            padding: '15px',
                            border: 'none',
                            cursor: 'pointer'
                        }}>
                        Save Changes
                    </button>
                    <button
                        onClick={() => router.back()}
                        style={{
                            marginTop: '10px',
                            width: '100%',
                            textAlign: 'center',
                            fontSize: '16px',
                            padding: '15px',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: 'transparent',
                            color: '#999'
                        }}>
                        Cancel
                    </button>
                </div>

                {/* Right Side: Image Upload */}
                <div style={{ width: '350px', minWidth: '300px' }}>
                    <label style={{ display: 'block', marginBottom: '15px', color: '#734F96', fontWeight: '600', fontSize: '16px' }}>Product Image</label>
                    <div style={{
                        border: '2px dashed #DF7E5D',
                        borderRadius: '20px',
                        height: '350px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FFFDD0',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer'
                    }} onClick={() => document.getElementById('editFileInput').click()}>

                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div style={{ fontSize: '16px', color: '#999' }}>No Image</div>
                        )}
                        <input
                            id="editFileInput"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
