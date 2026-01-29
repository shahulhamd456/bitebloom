import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Gallery from '../../../models/Gallery';

export async function GET() {
    try {
        await dbConnect();
        const galleryItems = await Gallery.find({});
        return NextResponse.json(galleryItems);
    } catch (error) {
        console.error("Error reading gallery:", error);
        return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
    }
}
