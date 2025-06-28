import auth from "../middleware/auth.js";
import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllComment,
  getDashboardData,
  getAllBlogPost, // ✅ use this one
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.get("/comments", auth, getAllComment);
adminRouter.get("/blogs", auth, getAllBlogPost); // ✅ updated
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById); // ✅ changed to POST (not GET)
adminRouter.get("/dashboard", auth, getDashboardData);

export default adminRouter;
