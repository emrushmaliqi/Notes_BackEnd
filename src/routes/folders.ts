import { Router } from "express";
import {
  getFolders,
  getFolder,
  postFolder,
  deleteFolder,
  patchFolder,
} from "../controllers/foldersController";
import { requireAuth } from "../middleware/requireAuth";
const router = Router();

router.use(requireAuth);

// get folders
router.get("/", getFolders);

// get a folder
router.get("/:id", getFolder);

// post a folder
router.post("/", postFolder);

// delete a folder
router.delete("/:id", deleteFolder);

// update a folder
router.patch("/:id", patchFolder);

module.exports = router;
