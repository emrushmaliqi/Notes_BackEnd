import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router,
} from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
config();
// express app
const app: Application = express();
const connectionString = process.env.ATLAS_URI || "";
const noteRoutes: Router = require("./routes/notes");
const folderRoutes: Router = require("./routes/folders");
const userRoutes: Router = require("./routes/user");

app.use(express.json());

mongoose.set("strictQuery", false);

mongoose
  .connect(connectionString)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));

// listen for request

app.use((req: Request, res: Response, next: NextFunction) => {
  res;
  console.log(req.path, req.method);
  next();
});

app.use("/api/notes", noteRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/user", userRoutes);
