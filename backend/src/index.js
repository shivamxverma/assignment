import connectDB from "./configs/db.config.js";
import dotenv from "dotenv";
import app from "./app.js";
import { generateSlots, seedAdmin } from '../services/service.js';

dotenv.config({
  path: "./.env" 
});

connectDB()
  .then(() => {
    Promise.all([seedAdmin(), generateSlots()])
      .then(() => {
        app.listen(process.env.PORT || 8000, () => {
          console.log(`Server is running on port ${process.env.PORT || 8000}`);
        });
      })
      .catch(err => {
        console.error("Error during seeding:", err);
        process.exit(1);
      });
  })
  .catch(err => {
    console.error("Error Connecting to MongoDB:", err);
    process.exit(1);
  });