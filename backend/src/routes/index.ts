import { Router } from "express";

import auth from "./auth";
import group from "./group";
import note from "./note";
import todo from "./todo";
import user from "./user";

const router = Router();

router.use(`/auth`, auth);

router.use("/todos", todo);

router.use("/users", user);

router.use("/groups", group);

router.use("/notes", note);

export default router;
