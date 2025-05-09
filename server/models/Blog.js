import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL to stored image
        required: true
    },
    severity: {
        type: String,
        enum: ['urgent', 'ongoing', 'basic'],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    keywords: {
        type: String,
        required: true
    },
    donationTarget: {
        type: Number,
        required: true
    },
    // userId: {
    //     type: String, // Changed from ObjectId to String
    //     required: true
    // },
    authorName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Blog', blogSchema);