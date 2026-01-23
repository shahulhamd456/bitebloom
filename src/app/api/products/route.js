import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get path to the JSON file
const getFilePath = () => {
    const __filename = fileURLToPath(import.meta.url);
    // Navigating up from src/app/api/products/route.js to src/data/products.json
    // route.js is in src/app/api/products (depth 3 from src)
    // data is in src/data (depth 1 from src)
    // So we go up 3 levels (api/products/app) to reach src, then into data
    // actually process.cwd() is safer in Next.js usually, but let's try strict path resolution

    // Using process.cwd() is robust for runtime reading in Next.js
    return path.join(process.cwd(), 'src', 'data', 'products.json');
};

const readData = () => {
    const filePath = getFilePath();
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
};

const writeData = (data) => {
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export async function GET() {
    try {
        const products = readData();
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error reading products:", error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const newProduct = await request.json();
        const products = readData();

        // Simple ID generation if not provided
        if (!newProduct.id) {
            const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
            newProduct.id = maxId + 1;
        }

        // Add timestamp or defaults if needed
        const productToAdd = {
            ...newProduct,
            rating: newProduct.rating || 0,
        };

        products.unshift(productToAdd); // Add to beginning like common feed
        writeData(products);

        return NextResponse.json(productToAdd, { status: 201 });
    } catch (error) {
        console.error("Error adding product:", error);
        return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const updatedData = await request.json();
        const { id, ...updates } = updatedData;

        if (!id) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        let products = readData();
        const index = products.findIndex(p => p.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        products[index] = { ...products[index], ...updates };
        writeData(products);

        return NextResponse.json(products[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        let products = readData();
        const initialLength = products.length;
        products = products.filter(p => p.id != id); // loose equality for string/number match

        if (products.length === initialLength) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        writeData(products);
        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
