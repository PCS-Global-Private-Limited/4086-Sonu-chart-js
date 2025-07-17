import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: "GET,POST,PUT,DELETE", // Allow necessary methods
    allowedHeaders: "Content-Type,Authorization", // Allow necessary headers
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

import productRouter from "./routes/product.route.js";
app.use("/api", productRouter);

export default app;
