import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comments from "../models/Comments.js";

// Admin Login
// adminController.js
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid credentials" }); // ✅ Fixed key
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ success: true, token }); // ✅ Fixed key
  } catch (error) {
    res.json({ success: false, message: error.message }); // ✅ Fixed key
  }
};

// Get All Blogs (for admin)
export const getAllBlogPost = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get All Comments
export const getAllComment = async (req, res) => {
  try {
    const comments = await Comments.find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Dashboard Data
export const getDashboardData = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comments.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboard = {
      blogs,
      comments,
      drafts,
      recentBlogs,
    };

    res.json({ success: true, dashboard });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete Comment by ID
export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comments.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Approve Comment by ID
export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comments.findByIdAndUpdate(id, { isApproved: true });
    res.json({ success: true, message: "Comment approved successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
