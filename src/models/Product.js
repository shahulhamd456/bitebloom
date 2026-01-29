import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true, // Assuming you want to keep the numeric ID for now, or you can switch to _id
    },
    name: {
        type: String,
        required: [true, 'Please provide a name for this product.'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for this product.'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price for this product.'],
    },
    category: {
        type: String,
        required: [true, 'Please provide a category for this product.'],
    },
    image: {
        type: String,
        required: [true, 'Please provide an image URL for this product.'],
    },
    rating: {
        type: Number,
        default: 0,
    },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
