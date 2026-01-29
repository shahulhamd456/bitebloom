import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';

export async function GET() {
    try {
        await dbConnect();
        const products = await Product.find({}).sort({ _id: -1 }); // Sort by newest (assuming _id timestamp)
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error reading products:", error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const newProduct = await request.json();

        // Generate a numeric ID if not provided (Migration strategy)
        // Ideally, switch to using _id in frontend
        if (!newProduct.id) {
            const lastProduct = await Product.findOne().sort({ id: -1 });
            newProduct.id = lastProduct ? lastProduct.id + 1 : 1;
        }

        const product = await Product.create(newProduct);
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Error adding product:", error);
        return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await dbConnect();
        const updatedData = await request.json();
        const { id, ...updates } = updatedData;

        if (!id) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        const product = await Product.findOneAndUpdate({ id: id }, updates, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        const deletedProduct = await Product.findOneAndDelete({ id: id });

        if (!deletedProduct) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
