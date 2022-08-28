import { Router } from "express";

import createTodo from "../../controllers/todos/create-todo";
import deleteTodo from "../../controllers/todos/delete-todo";
import getAllTodos from "../../controllers/todos/get-all-todos";

const router = Router();

router.get("/", getAllTodos);

router.post("/", createTodo);

router.delete("/:id", deleteTodo);

export default router;
