import mongoose, { ObjectId } from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    notes: {
      type: Array<ObjectId>,
      required: true,
    },
  },
  { timestamps: true }
);

const folderModel = mongoose.model("Folder", folderSchema);

export default folderModel;
