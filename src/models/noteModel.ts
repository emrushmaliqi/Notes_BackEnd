import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    folder: String,
  },
  { timestamps: true }
);

const noteModel = model("Note", noteSchema);

export default noteModel;
