'use client';

import React, { useState } from 'react';
import { useProducts } from '../../../../context/ProductContext';
import { useRouter } from 'next/navigation';

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

export default function AddProductPage() {
    const { addProduct, categories, addCategory } = useProducts();
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: categories[0] || 'Cakes',
        description: ''
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (limit to ~300KB for localStorage safety)
            if (file.size > 300 * 1024) {
                alert("Image too large! Please upload an image smaller than 300KB to ensure it saves.");
                e.target.value = ""; // Clear input
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        // Basic Validation
        if (!formData.title || !formData.price) {
            alert('Please fill in required fields');
            return;
        }

        let finalCategory = formData.category;

        if (isNewCategory) {
            if (!newCategoryName.trim()) {
                alert("Please enter a name for the new category");
                return;
            }
            finalCategory = newCategoryName.trim();
            addCategory(finalCategory);
        }

        const newProduct = {
            id: Date.now(), // Generate unique ID
            title: formData.title,
            price: Number(formData.price),
            category: finalCategory,
            description: formData.description,
            img: imagePreview || '/asset/p1.jpg', // Fallback image
            rating: 5 // Default rating for new items
        };

        addProduct(newProduct);
        alert('Product Added Successfully!');
        router.push('/products'); // Redirect to shop to see it
    };

    return (
        <div style={{ paddingBottom: '50px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '42px', color: '#DF7E5D', fontFamily: '"Cookie", cursive' }}>Add New Product</h1>
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
                        placeholder="e.g. Strawberry Cupcake"
                    />
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <InputGroup
                                label="Price ($)"
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="0.00"
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: '#734F96', fontWeight: '600', fontSize: '16px' }}>Category</label>
                                <select
                                    value={isNewCategory ? 'new_cat_option' : formData.category}
                                    onChange={(e) => {
                                        if (e.target.value === 'new_cat_option') {
                                            setIsNewCategory(true);
                                            setFormData({ ...formData, category: '' });
                                        } else {
                                            setIsNewCategory(false);
                                            setFormData({ ...formData, category: e.target.value });
                                        }
                                    }}
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
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat}>{cat}</option>
                                    ))}
                                    <option value="new_cat_option" style={{ fontWeight: 'bold', color: '#DF7E5D' }}>+ Add New Category</option>
                                </select>
                                {isNewCategory && (
                                    <input
                                        type="text"
                                        placeholder="Enter new category name"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        style={{
                                            marginTop: '10px',
                                            width: '100%',
                                            padding: '10px 15px',
                                            borderRadius: '20px',
                                            border: '1px solid #DF7E5D',
                                            backgroundColor: '#fff',
                                            fontSize: '14px',
                                            outline: 'none'
                                        }}
                                        autoFocus
                                    />
                                )}
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
                        Publish Product
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
                    }} onClick={() => document.getElementById('fileInput').click()}>

                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <>
                                <div style={{ fontSize: '40px', color: '#DF7E5D', marginBottom: '10px' }}>
                                    <i className="fa-solid fa-cloud-arrow-up"></i>
                                </div>
                                <p style={{ color: '#734F96', fontWeight: '500' }}>Click to upload image</p>
                                <p style={{ fontSize: '13px', color: '#999' }}>JPG, PNG (Max 5MB)</p>
                            </>
                        )}
                        <input
                            id="fileInput"
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
