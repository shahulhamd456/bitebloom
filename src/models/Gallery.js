import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    img: {
        type: String,
        required: [true, 'Please provide an image URL.'],
    },
    category: {
        type: String,
        required: [true, 'Please provide a category.'],
    },
    title: {
        type: String,
        required: false
    }
});

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
