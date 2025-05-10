import RescueTeam from '../models/RescueTeam.js';
import mongoose from 'mongoose';

export const registerRescueTeam = async (req, res) => {
    try {
        const {
            teamName,
            email,
            phone,
            password,
            description,
            teamSize,
            deployedDate
        } = req.body;

        // Get file paths
        const certificatePath = req.files['certificate'][0].path;
        const profilePicturePath = req.files['profilePicture'][0].path;

        // Create new rescue team
        const rescueTeam = await RescueTeam.create({
            teamName,
            email,
            phone,
            password,
            description,
            teamSize,
            deployedDate,
            certificatePath,
            profilePicturePath
        });

        res.status(201).json({
            success: true,
            message: 'Rescue team registered successfully',
            team: {
                id: rescueTeam._id,
                teamName: rescueTeam.teamName,
                email: rescueTeam.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
};

// export const getAllRescueTeams = async (req, res) => {
//     try {
//         const teams = await RescueTeam.find()
//             .select('teamName email teamSize description');

//         res.status(200).json({
//             success: true,
//             data: teams
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Failed to fetch rescue teams',
//             error: error.message
//         });
//     }
// };

export const getAllRescueTeams = async (req, res) => {
    try {
        const teams = await RescueTeam.find()
            .select('teamName email teamSize description assignedBlogId assignedBlogTitle')
            .populate('assignedBlogId', 'title'); // Populate blog details if needed

        res.status(200).json({
            success: true,
            data: teams
        });
    } catch (error) {
        console.error('Error fetching rescue teams:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch rescue teams',
            error: error.message
        });
    }
};

export const getRescueTeamById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid rescue team ID format'
            });
        }

        const team = await RescueTeam.findById(id)
            .select('teamName email phone teamSize description deployedDate profilePicturePath assignedBlogId');

        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Rescue team not found'
            });
        }

        res.status(200).json({
            success: true,
            data: team
        });
    } catch (error) {
        console.error('Error fetching rescue team:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch rescue team',
            error: error.message
        });
    }
};