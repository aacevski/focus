import { Router } from "express";

import createGroup from "../../controllers/group/create-group";
import getAllGroups from "../../controllers/group/get-all-groups";

const router = Router();

router.get("/", getAllGroups);

router.post("/", createGroup);

export default router;
