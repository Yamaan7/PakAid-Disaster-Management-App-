import User from '../models/User.js';
import RescueTeam from '../models/RescueTeam.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // First check regular users
        let user = await User.findOne({ email });
        let isRescueTeam = false;

        // If not found in users, check rescue teams
        if (!user) {
            user = await RescueTeam.findOne({ email });
            isRescueTeam = true;
        }

        // If no user found at all
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Compare password directly using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                role: isRescueTeam ? 'rescue-team' : user.role,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Prepare user data based on type
        // const userData = isRescueTeam ? {
        //     id: user._id,
        //     name: user.teamName,
        //     email: user.email,
        //     role: 'rescue-team',
        //     phone: user.phone,
        //     description: user.description,
        //     teamSize: user.teamSize,
        //     deployedDate: user.deployedDate
        // } : {
        //     id: user._id,
        //     name: user.name,
        //     email: user.email,
        //     role: user.role
        // };

        const userData = isRescueTeam ? {
            id: user._id,
            name: user.teamName, // Optional: keep for display name
            teamName: user.teamName, // ✅ Explicit field for rescue team dashboard
            email: user.email,
            role: 'rescue-team',
            phone: user.phone,
            description: user.description,
            teamSize: user.teamSize,
            deployedDate: user.deployedDate,
            profilePicturePath: user.profilePicturePath, // ✅ add this
            assignedBlogTitle: user.assignedBlogTitle // ✅ add this
        } : {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };


        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: userData
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
};