import { Router } from "express";
import {
  getNotes,
  getNote,
  postNote,
  getFolderNotes,
  deleteNote,
  patchNote,
} from "../controllers/notesController";
import { requireAuth } from "../middleware/requireAuth";

const router: Router = Router();

// authenticate user
router.use(requireAuth);

// get all notes
router.get("/", getNotes);

// get all notes with folder Notes
router.get("/withFolderNotes", getNotes);

// get a folder's notes
router.get("/folder/:id", getFolderNotes);

// get one note
router.get("/:id", getNote);

// post a note
router.post("/", postNote);

// delete a note
router.delete("/:id", deleteNote);

// update a note
router.patch("/:id", patchNote);

module.exports = router;
