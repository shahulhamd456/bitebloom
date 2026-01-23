'use client';

import React from 'react';
import { useOffers } from '../../../context/OfferContext';
import Link from 'next/link';

// Icons
const EditIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const TrashIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;

import { useSearchParams } from 'next/navigation';

// ... (icons)

export default function AdminOffersPage() {
    const { offers, deleteOffer } = useOffers();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    const filteredOffers = offers.filter(offer =>
        !searchQuery ||
        offer.title.toLowerCase().includes(searchQuery) ||
        offer.subtitle.toLowerCase().includes(searchQuery)
    );

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this offer?")) {
            deleteOffer(id);
        }
    };

    return (
        <div style={{ paddingBottom: '50px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '42px', color: '#DF7E5D', fontFamily: '"Cookie", cursive' }}>Special Offers</h1>
                <Link href="/admin/offers/add" style={{
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
                    + Add New Offer
                </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                {filteredOffers.map(offer => (
                    <div key={offer.id} style={{
                        backgroundColor: '#FFFDD0',
                        border: '2px solid #DF7E5D',
                        borderRadius: '30px',
                        padding: '30px',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ marginBottom: '20px' }}>
                            <img src={offer.img} alt={offer.title} style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                border: '3px solid white',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                                marginBottom: '15px'
                            }} />
                            <h2 style={{ fontSize: '28px', color: '#DF7E5D', margin: '0 0 5px 0' }}>{offer.title}</h2>
                            <h3 style={{ fontSize: '18px', color: '#333', margin: '0 0 10px 0' }}>{offer.subtitle}</h3>
                            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>{offer.description}</p>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Link href={`/admin/offers/edit/${offer.id}`} style={{
                                flex: 1,
                                backgroundColor: 'white',
                                color: '#333',
                                border: '1px solid #ddd',
                                padding: '10px',
                                borderRadius: '15px',
                                textAlign: 'center',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '5px',
                                fontWeight: '500'
                            }}>
                                <EditIcon /> Edit
                            </Link>
                            <button onClick={() => handleDelete(offer.id)} style={{
                                flex: 1,
                                backgroundColor: '#ffeff0',
                                color: '#d32f2f',
                                border: 'none',
                                padding: '10px',
                                borderRadius: '15px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '5px',
                                fontWeight: '500'
                            }}>
                                <TrashIcon /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {offers.length === 0 && (
                <div style={{ textAlign: 'center', color: '#999', padding: '50px' }}>
                    No offers active. Click "Add New Offer" to create one.
                </div>
            )}
        </div>
    );
}
