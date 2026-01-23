import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const getFilePath = () => {
    return path.join(process.cwd(), 'src', 'data', 'gallery.json');
};

const readData = () => {
    const filePath = getFilePath();
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
};

export async function GET() {
    try {
        const galleryItems = readData();
        return NextResponse.json(galleryItems);
    } catch (error) {
        console.error("Error reading gallery:", error);
        return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
    }
}
