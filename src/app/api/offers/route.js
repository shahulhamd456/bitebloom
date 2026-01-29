import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Offer from '../../../models/Offer';

export async function GET() {
    try {
        await dbConnect();
        const offers = await Offer.find({}).sort({ _id: -1 });
        return NextResponse.json(offers);
    } catch (error) {
        console.error("Error reading offers:", error);
        return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const newOffer = await request.json();

        if (!newOffer.id) {
            const lastOffer = await Offer.findOne().sort({ id: -1 });
            newOffer.id = lastOffer ? lastOffer.id + 1 : 1;
        }

        const offer = await Offer.create(newOffer);
        return NextResponse.json(offer, { status: 201 });
    } catch (error) {
        console.error("Error adding offer:", error);
        return NextResponse.json({ error: 'Failed to add offer' }, { status: 500 });
    }
}
