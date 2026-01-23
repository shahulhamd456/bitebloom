'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const OfferContext = createContext({
    offers: [],
    addOffer: () => { },
    deleteOffer: () => { },
    updateOffer: () => { }
});

export const OfferProvider = ({ children }) => {
    // Initial static data to match current website content
    const initialOffers = [
        {
            id: 1,
            title: "50% OFF",
            subtitle: "On all Sourdough Breads",
            description: "Valid every Wednesday from 4 PM - 7 PM",
            img: "/asset/a1.jpg"
        },
        {
            id: 2,
            title: "Buy 1 Get 1",
            subtitle: "Cupcakes Special",
            description: "Valid on weekends for all flavors",
            img: "/asset/pp3.jpg"
        }
    ];

    const [offers, setOffers] = useState(initialOffers);

    // Initial Load - Check local storage
    useEffect(() => {
        const storedOffers = localStorage.getItem('bitebloom_offers');
        if (storedOffers) {
            setOffers(JSON.parse(storedOffers));
        }
    }, []);

    // Sync to local storage
    useEffect(() => {
        localStorage.setItem('bitebloom_offers', JSON.stringify(offers));
    }, [offers]);

    const addOffer = (newOffer) => {
        setOffers(prev => [newOffer, ...prev]);
    };

    const deleteOffer = (id) => {
        setOffers(prev => prev.filter(offer => offer.id !== id));
    };

    const updateOffer = (id, updatedOffer) => {
        setOffers(prev => prev.map(offer => offer.id === id ? { ...offer, ...updatedOffer } : offer));
    };

    return (
        <OfferContext.Provider value={{ offers, addOffer, deleteOffer, updateOffer }}>
            {children}
        </OfferContext.Provider>
    );
};

export const useOffers = () => useContext(OfferContext);
