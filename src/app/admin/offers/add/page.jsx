'use client';

import React, { useState } from 'react';
import { useOffers } from '../../../../context/OfferContext';
import { useRouter } from 'next/navigation';

const InputGroup = ({ label, value, onChange, placeholder }) => (
    <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: '#734F96', fontWeight: '600', fontSize: '16px' }}>{label}</label>
        <input
            type="text"
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

export default function AddOfferPage() {
    const { addOffer } = useOffers();
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: ''
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 300 * 1024) {
                alert("Image too large! Please upload under 300KB.");
                e.target.value = "";
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
        if (!formData.title || !formData.subtitle) {
            alert('Please fill in required fields');
            return;
        }

        const newOffer = {
            id: Date.now(),
            ...formData,
            img: imagePreview || '/asset/p1.jpg'
        };

        addOffer(newOffer);
        router.push('/admin/offers');
    };

    return (
        <div style={{ paddingBottom: '50px' }}>
            <h1 style={{ fontSize: '42px', color: '#DF7E5D', fontFamily: '"Cookie", cursive', marginBottom: '30px' }}>Add New Offer</h1>

            <div style={{
                backgroundColor: 'white',
                borderRadius: '30px',
                padding: '40px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                display: 'flex',
                gap: '50px',
                flexWrap: 'wrap'
            }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <InputGroup
                        label="Offer Title (e.g. 50% OFF)"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Main Headline"
                    />
                    <InputGroup
                        label="Subtitle (e.g. On all Cakes)"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Sub Headline"
                    />
                    <TextAreaGroup
                        label="Details / Validity"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="e.g. Valid on weekends only..."
                    />

                    <button
                        onClick={handleSubmit}
                        className="button"
                        style={{ width: '100%', marginTop: '10px' }}
                    >
                        Publish Offer
                    </button>
                </div>

                <div style={{ width: '350px', minWidth: '300px' }}>
                    <label style={{ display: 'block', marginBottom: '15px', color: '#734F96', fontWeight: '600', fontSize: '16px' }}>Offer Image</label>
                    <div style={{
                        border: '2px dashed #DF7E5D',
                        borderRadius: '20px',
                        height: '350px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FFFDD0',
                        overflow: 'hidden',
                        cursor: 'pointer'
                    }} onClick={() => document.getElementById('fileInput').click()}>

                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ color: '#DF7E5D', fontWeight: 'bold' }}>Upload Image</p>
                            </div>
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
