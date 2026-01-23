'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';


const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [categories, setCategories] = useState(['Cupcakes', 'Artisan Breads', 'Cookies', 'Gluten Free', 'Pastries', 'Special Occasion']);

    // Initial Load
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error("Error loading products:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();

        const storedActivities = localStorage.getItem('bitebloom_activities');
        if (storedActivities) {
            setActivities(JSON.parse(storedActivities));
        }

        const storedCategories = localStorage.getItem('bitebloom_categories');
        if (storedCategories) {
            setCategories(JSON.parse(storedCategories));
        }
    }, []);

    // Sync activities to local storage
    useEffect(() => {
        localStorage.setItem('bitebloom_activities', JSON.stringify(activities));
    }, [activities]);

    // Sync categories to local storage
    useEffect(() => {
        localStorage.setItem('bitebloom_categories', JSON.stringify(categories));
    }, [categories]);

    const logActivity = (action, details) => {
        const newActivity = {
            id: Date.now(),
            action,
            details,
            timestamp: new Date().toISOString()
        };
        setActivities(prev => [newActivity, ...prev].slice(0, 10)); // Keep only last 10 activities
    };

    const addCategory = (newCategory) => {
        if (!categories.includes(newCategory)) {
            setCategories(prev => [...prev, newCategory]);
            logActivity('Added category', newCategory);
        }
    };

    const addProduct = async (newProduct) => {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) throw new Error('Failed to add product');

            const addedProduct = await response.json();
            setProducts(prev => [addedProduct, ...prev]);
            logActivity('Added product', addedProduct.title);
        } catch (err) {
            console.error("Error adding product:", err);
            // Optionally set error state or show notification
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`/api/products?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete product');

            const product = products.find(p => p.id === id);
            setProducts(prev => prev.filter(p => p.id !== id));
            logActivity('Deleted product', product ? product.title : 'Unknown Product');
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    const updateProduct = async (id, updatedProduct) => {
        try {
            const response = await fetch('/api/products', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, ...updatedProduct }),
            });

            if (!response.ok) throw new Error('Failed to update product');

            const savedProduct = await response.json();
            setProducts(prev => prev.map(product => product.id === id ? savedProduct : product));
            logActivity('Updated product', savedProduct.title || 'Product');
        } catch (err) {
            console.error("Error updating product:", err);
        }
    };

    return (
        <ProductContext.Provider value={{ products, activities, categories, addProduct, deleteProduct, updateProduct, addCategory, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
