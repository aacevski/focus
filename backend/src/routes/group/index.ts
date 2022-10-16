import { Router } from "express";

import createGroup from "../../controllers/group/create-group";
import getAllGroups from "../../controllers/group/get-all-groups";

// import createTodo from "../../controllers/todos/create-todo";
// import deleteTodo from "../../controllers/todos/delete-todo";

const router = Router();

router.get("/", getAllGroups);

router.post("/", createGroup);

// router.delete("/:id", deleteTodo);

export default router;
