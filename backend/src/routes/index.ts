import { Router } from "express";

import auth from "./auth";
import todo from "./todo";

const router = Router();

router.use(`/auth`, auth);

router.use("/todos", todo);

export default router;
