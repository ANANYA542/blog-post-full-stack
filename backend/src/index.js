import express from "express";
import cors from "cors";
import serverless from "serverless-http";

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Health check */
app.get("/health", (req, res) => {
  res.json({ status: "Backend is running" });
});

/* Test route */
app.get("/posts", (req, res) => {
  res.json({
    message: "Posts API working",
    posts: []
  });
});

/* Auth test */
app.post("/auth/login", (req, res) => {
  res.json({
    message: "Login route working"
  });
});

app.post("/auth/signup", (req, res) => {
  res.json({
    message: "Signup route working"
  });
});

/* IMPORTANT: no app.listen() */
export default serverless(app);
