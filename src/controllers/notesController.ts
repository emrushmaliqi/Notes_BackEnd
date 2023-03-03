import { RequestHandler, Request, Response } from "express";
import mongoose from "mongoose";
import Note from "../models/noteModel";
import Folder from "../models/folderModel";
import { NoteObj } from "../Types";

// get all Notes

export const getNotes: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  let notes;
  if (req.url.includes("withFolderNotes")) {
    notes = await Note.find({}).sort({ createdAt: -1 });
  } else {
    notes = await Note.find({ folder: { $exists: false } }).sort({
      createdAt: -1,
    });
  }
  res.status(200).json(notes);
};

// get a folder Notes

export const getFolderNotes: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "No such Folder" });
    return;
  }

  const folderNotes = await Note.find({ folder: id }).sort({ createdAt: -1 });

  if (!folderNotes) {
    res.status(404).json({ error: "No such Folder" });
    return;
  }

  res.status(200).json(folderNotes);
};

// get a Note

export const getNote: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "No such Note" });
    return;
  }

  const note = await Note.findById(id);

  if (!note) {
    res.status(404).json({ error: "No such Note" });
    return;
  }
  res.status(200).json(note);
};

// post a Note

export const postNote: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, content, folder } = req.body as NoteObj;
  try {
    if (folder) {
      const note = await Note.create({ title, content, folder });
      await Folder.findByIdAndUpdate(folder, {
        $push: {
          notes: note.id,
        },
      });
      res.status(201).json(note);
    } else {
      const note = await Note.create({
        title,
        content,
      });
      res.status(201).json(note);
    }
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ error: err.message });
  }
};

// delete a Note

export const deleteNote: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "No such Note" });
    return;
  }

  const note = await Note.findByIdAndDelete(id);

  if (!note) {
    res.status(404).json({ error: "No such Note" });
    return;
  }

  if (note.folder) {
    const noteFolder = await Folder.findByIdAndUpdate(note.folder, {
      $pull: {
        notes: note.id,
      },
    });
    if (!noteFolder) {
      res.status(404).json({ error: "No such Note/Folder" });
      return;
    }
  }

  res.status(202).json(note);
};

// patch a Note

export const patchNote: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { content, title } = req.body as NoteObj;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "No such Note" });
    return;
  }

  const note = await Note.findByIdAndUpdate(id, { content, title });

  if (!note) {
    res.status(404).json({ error: "No such Note" });
    return;
  }

  res.status(200).json(note);
};
