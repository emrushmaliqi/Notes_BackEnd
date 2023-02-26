import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import Folder from "../models/folderModel";
import Note from "../models/noteModel";
import { FolderObj } from "../Types";

// get folders

export const getFolders: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const folders = await Folder.find({}).sort({ createdAt: -1 });
  res.status(200).json(folders);
};

// get a folder

export const getFolder: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "No such Folder" });
    return;
  }

  const folder = await Folder.findById(id);

  if (!folder) {
    res.status(404).json({ error: "No such Folder" });
    return;
  }

  res.status(200).json(folder);
};

// create a folder

export const postFolder: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  if ("name" in req.body && "notes" in req.body) {
    const { name, notes } = req.body as FolderObj;
    try {
      const folder = await Folder.create({ name, notes });
      res.status(200).json(folder);
    } catch (err) {
      if (err instanceof Error) res.status(400).json({ error: err.message });
    }
  } else {
    res.json({ error: "Folder name and/or notes not found" });
  }
};

// delete a folder

export const deleteFolder: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "No such Folder" });
    return;
  }

  const folder = await Folder.findByIdAndDelete(id);

  if (!folder) {
    res.status(404).json({ error: "No such Folder" });
    return;
  }

  await Note.deleteMany({ folder: folder.id });
  res.status(202).json(folder);
};

// Edit a Folder
export const patchFolder: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { notes } = req.body as FolderObj;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such Folder" });
    return;
  }

  const folder = await Folder.findByIdAndUpdate(id, { notes });

  if (!folder) {
    res.status(404).json({ error: "No such Folder" });
    return;
  }

  res.status(200).json(folder);
};
