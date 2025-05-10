import Blog from '../models/Blog.js';
import mongoose from 'mongoose';
import RescueTeam from '../models/RescueTeam.js';


export const createBlog = async (req, res) => {
    try {
        const blog = new Blog({
            ...req.body,
            image: req.file ? req.file.path : null, // Get image path from multer
            userId: req.body.userId, // Get from request body since we don't have auth
            createdAt: new Date()
        });

        await blog.save();
        res.status(201).json({ success: true, data: blog });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const getUserBlogs = async (req, res) => {
    try {
        const authorName = req.params.authorName;
        const blogs = await Blog.find({ authorName: authorName }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                error: 'Blog not found'
            });
        }

        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid blog ID format'
            });
        }

        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                error: 'Blog not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully',
            deletedBlog: blog // Optional: include the deleted blog data
        });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const updateBlog = async (req, res) => {
    try {
        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid blog ID format'
            });
        }

        // Prepare update data
        const updateData = {
            ...req.body,
            // Only update image if a new one is uploaded
            ...(req.file && { image: req.file.path }),
            updatedAt: new Date()
        };

        // Find and update the blog
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({
                success: false,
                error: 'Blog not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Blog updated successfully',
            data: updatedBlog
        });

    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({
            success: false,
            error: 'Server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// export const assignTeamToBlog = async (req, res) => {
//     try {
//         const { blogId } = req.params;
//         const { teamId } = req.body;

//         // Update the blog with the assigned team
//         const updatedBlog = await Blog.findByIdAndUpdate(
//             blogId,
//             { assignedTeam: teamId },
//             { new: true }
//         ).populate('assignedTeam');

//         if (!updatedBlog) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Blog not found'
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Team assigned successfully',
//             data: updatedBlog
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Failed to assign team',
//             error: error.message
//         });
//     }
// };

export const assignTeamToBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { teamId } = req.body;

        // Find the blog first to get its title
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Update the blog with assigned team
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            { assignedTeamId: teamId },
            { new: true }
        );

        // Update the rescue team with assigned blog
        const updatedTeam = await RescueTeam.findByIdAndUpdate(
            teamId,
            {
                assignedBlogId: blogId,
                assignedBlogTitle: blog.title
            },
            { new: true }
        );

        if (!updatedBlog || !updatedTeam) {
            return res.status(404).json({
                success: false,
                message: 'Failed to update assignment'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                blog: updatedBlog,
                team: updatedTeam
            },
            message: 'Team assigned successfully'
        });

    } catch (error) {
        console.error('Assignment error:', error);
        res.status(500).json({
            success: false,
            message: 'Error assigning team',
            error: error.message
        });
    }
};

export const updateDonation = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount } = req.body;

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Update donation amount
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            {
                $inc: { donationCurrent: amount }
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: updatedBlog
        });
    } catch (error) {
        console.error('Donation update error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating donation',
            error: error.message
        });
    }
};