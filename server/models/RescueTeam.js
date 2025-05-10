import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const rescueTeamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    teamSize: {
        type: Number,
        required: true
    },
    deployedDate: {
        type: Date,
        required: true
    },
    certificatePath: {
        type: String,
        required: true
    },
    profilePicturePath: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'rescue-team',
        enum: ['admin', 'rescue-team', 'user']  // restrict possible values
    },
    assignedBlogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        default: null
    },
    assignedBlogTitle: {
        type: String,
        default: null
    }
}, { timestamps: true });

// Hash password before saving
rescueTeamSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

rescueTeamSchema.pre('find', function (next) {
    this.populate('assignedBlogId', 'title');
    next();
});

const RescueTeam = mongoose.model('RescueTeam', rescueTeamSchema);
export default RescueTeam;