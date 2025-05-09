import RescueTeam from '../models/RescueTeam.js';

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