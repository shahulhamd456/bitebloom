import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: [true, 'Please provide a title for this offer.'],
    },
    subtitle: {
        type: String,
        required: [true, 'Please provide a subtitle for this offer.'],
    },
    description: {
        type: String,
    },
    img: {
        type: String,
        required: [true, 'Please provide an image URL for this offer.'],
    },
});

export default mongoose.models.Offer || mongoose.model('Offer', OfferSchema);
