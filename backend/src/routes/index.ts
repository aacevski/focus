import { Router } from "express";

import auth from "./auth";
import group from "./group";
import todo from "./todo";
import user from "./user";

const router = Router();

router.use(`/auth`, auth);

router.use("/groups", group);

router.use("/todos", todo);

router.use("/users", user);

export default router;
