import { Router } from "express";

import createNote from "../../controllers/note/create-note";

const router = Router();

router.post("/", createNote);

export default router;
