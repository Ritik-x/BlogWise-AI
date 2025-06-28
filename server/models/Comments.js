import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
    name: { type: String, required: true },
    content: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// 👇 Use "Comments" as model name if you're using it everywhere
const Comments =
  mongoose.models.Comments || mongoose.model("Comments", commentSchema);

export default Comments;
