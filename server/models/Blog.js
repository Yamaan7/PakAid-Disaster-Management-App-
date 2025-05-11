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
        enum: ['urgent', 'ongoing', 'past'],
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
    },
    assignedTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RescueTeam',
        default: null
    },
    assignedTeamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RescueTeam',
        default: null
    },
    donationCurrent: {
        type: Number,
        default: 0
    },
    donationTarget: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Blog', blogSchema);