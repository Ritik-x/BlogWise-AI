import fs from "fs";
import imagekit from "../config/imagekit.js";
import Blog from "../models/Blog.js";
import Comments from "../models/Comments.js";
import generateText from "../config/gemini.js";
export const addBlog = async (req, res) => {
  try {
    const { title, subtitle, description, category } = req.body;
    const imageFile = req.file;

    if (!title || !subtitle || !description || !category || !imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname, // ✅ THIS IS REQUIRED
      folder: "/blogs",
    });

    const optimisedImageUrl = imagekit.url({
      path: uploadResponse.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    await Blog.create({
      title,
      subTitile: subtitle, // ❗ schema spelling = subTitile
      description,
      category,
      image: optimisedImageUrl,
      isPublished: true,
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    console.error("🔥 Error adding blog:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });

    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, messege: error.messege });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, messege: "Blog Not Found" });
    }

    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, messege: error.messege });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);

    //Delete all comments attached with this blogs

    await Comments.deleteMany({ blog: id });

    res.json({ success: true, messege: "aapka blog delete ho chuko haigo" });
  } catch (error) {
    res.json({ success: false, messege: error.messege });
  }
};
//publish ya unpublish blog
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;

    await blog.save();

    res.json({ success: true, messege: "Blog Status Updated" });
  } catch (error) {
    res.json({ success: false, messege: error.messege });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    await Comments.create({ blog, name, content });

    res.json({ success: true, messege: "comment added for review " });
  } catch (error) {
    res.json({ success: false, messege: error.messege });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comments.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt)
      return res.status(400).json({ success: false, message: "No prompt" });

    console.log("🧠 Prompt:", prompt);
    const content = await generateText(prompt);
    res.json({ success: true, content });
  } catch (err) {
    console.error("🔥 generateContent failed:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
