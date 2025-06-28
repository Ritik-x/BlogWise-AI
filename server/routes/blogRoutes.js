import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  togglePublish,
} from "../controllers/blogControllert.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);

blogRouter.get("/all", getAllBlogs);

blogRouter.get("/:blogId", getBlogById);

blogRouter.post("/delete", auth, deleteBlogById);

blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.post("/add-comment", addComment);
blogRouter.get("/comments/:blogId", getBlogComments); // changed to GET + path param
blogRouter.post("/generate", generateContent);

export default blogRouter;
