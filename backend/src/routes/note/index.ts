import { Router } from "express";

import addNoteToGroup from "../../controllers/note/add-note-to-group";
import createNote from "../../controllers/note/create-note";
import deleteNote from "../../controllers/note/delete-note";
import editNote from "../../controllers/note/edit-note";
import getAllNotes from "../../controllers/note/get-all-notes";

const router = Router();

router.get("/", getAllNotes);

router.post("/", createNote);

router.post("/:id", editNote);

router.post("/:noteId/:groupId", addNoteToGroup);

router.delete("/:id", deleteNote);

export default router;
