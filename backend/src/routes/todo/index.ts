import { Router } from "express";

import addTodoToGroup from "../../controllers/todos/add-todo-to-group";
import createTodo from "../../controllers/todos/create-todo";
import deleteTodo from "../../controllers/todos/delete-todo";
import getAllTodos from "../../controllers/todos/get-all-todos";

const router = Router();

router.get("/", getAllTodos);

router.post("/", createTodo);

router.post("/:todoId/:groupId", addTodoToGroup);

router.delete("/:id", deleteTodo);

export default router;
