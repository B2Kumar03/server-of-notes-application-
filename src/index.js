import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/userRoute.js";
import notesrouter from "./routes/notesRoutes.js";

dotenv.config();
const app = express();
console.log("Environment variables loaded");
console.log("MONGO_URI:", process.env.MONGO_URI);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", router);
app.use("/api/notes",notesrouter);

mongoose
  .connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("Mongo error", err));





 