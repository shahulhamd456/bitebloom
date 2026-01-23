'use client';

import React, { useState } from 'react';
import { Upload, Calendar, Send } from 'lucide-react';
import '../../css/custom-orders.css';

const CustomOrders = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        eventType: 'Birthday',
        flavor: 'Vanilla',
        size: '1kg',
        date: '',
        details: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = `*New Custom Order Request*\n\n` +
            `*Name:* ${formData.name}\n` +
            `*Contact:* ${formData.contact}\n` +
            `*Event:* ${formData.eventType}\n` +
            `*Date:* ${formData.date}\n` +
            `*Flavor:* ${formData.flavor}\n` +
            `*Size:* ${formData.size}\n` +
            `*Details:* ${formData.details}`;

        window.open(`https://wa.me/919744566541?text=${encodeURIComponent(text)}`, '_blank');
        setSubmitted(true);
    };

    return (
        <main className="page-container">
            <div className="container">
                <div className="section-header">
                    <h1 className="section-title">Custom Orders</h1>
                    <p className="ppp">Design your dream cake! Tell us what you need, and we'll bake it to perfection.</p>
                </div>

                {submitted ? (
                    <div className="success-message">
                        <h2 className="success-title">Thank You!</h2>
                        <p style={{ fontSize: '18px' }}>Your custom order request has been received. We will contact you shortly to confirm details and pricing.</p>
                        <button onClick={() => setSubmitted(false)} className="button" style={{ marginTop: '20px' }}>Submit Another</button>
                    </div>
                ) : (
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <form onSubmit={handleSubmit} className="custom-form">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Your Name</label>
                                        <input type="text" name="name" className="form-control form-input-style" placeholder="John Doe" required onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Contact Number</label>
                                        <input type="tel" name="contact" className="form-control form-input-style" placeholder="+1 234 567 890" required onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Event Type</label>
                                        <select name="eventType" className="form-control form-input-style" onChange={handleChange}>
                                            <option>Birthday</option>
                                            <option>Wedding</option>
                                            <option>Anniversary</option>
                                            <option>Corporate Event</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Date Needed</label>
                                        <input type="date" name="date" className="form-control form-input-style" required onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Flavor Preference</label>
                                        <select name="flavor" className="form-control form-input-style" onChange={handleChange}>
                                            <option>Vanilla Bean</option>
                                            <option>Rich Chocolate</option>
                                            <option>Red Velvet</option>
                                            <option>Lemon Zest</option>
                                            <option>Carrot Cake</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Approx. Size / Servings</label>
                                        <select name="size" className="form-control form-input-style" onChange={handleChange}>
                                            <option>Small (4-6 servings)</option>
                                            <option>Medium (10-12 servings)</option>
                                            <option>Large (20-25 servings)</option>
                                            <option>Tiered Cake (Custom)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-bold">Additional Details / Design Request</label>
                                    <textarea name="details" className="form-control form-input-style" rows="4" placeholder="Describe your dream cake... (e.g., color theme, message on cake)" onChange={handleChange}></textarea>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="button" style={{ width: '100%', justifyContent: 'center', fontSize: '18px' }}>
                                        <Send size={20} style={{ marginRight: '10px' }} /> Request Quote
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default CustomOrders;
