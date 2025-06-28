import express from "express";
import "dotenv/config";
import adminRouter from "./routes/adminroutes.js";

import cors from "cors";
import connectDB from "./config/db.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

await connectDB();
//Middleware

app.use(cors());

app.use(express.json());
//Routes
app.get("/", (req, res) => res.send("Api kaam karri hai"));
app.use("/api/admin", adminRouter);

app.use("/api/blog", blogRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
export default app;
