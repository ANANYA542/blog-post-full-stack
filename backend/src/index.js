import express from "express";
import cors from "cors";
import serverless from "serverless-http";

import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import dashboardRoutes from "./routes/dashboard.js";
import categoriesRoutes from "./routes/categories.js";

const app = express();

/* Same behavior as your working backend */
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/categories", categoriesRoutes);

app.get("/", (req, res) => {
  res.send("Blog backend is live");
});

/* THIS makes it compatible with Vercel */
export default serverless(app);
