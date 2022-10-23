import { Router } from "express";

import createGroup from "../../controllers/group/create-group";
import deleteGroup from "../../controllers/group/delete-group";
import editGroup from "../../controllers/group/edit-group";
import getAllGroups from "../../controllers/group/get-all-groups";

const router = Router();

router.get("/", getAllGroups);

router.post("/", createGroup);

router.post("/:id", editGroup);

router.delete("/:id", deleteGroup);

export default router;
