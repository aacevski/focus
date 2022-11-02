import { Request, Response } from "express";

import dataSource from "../../data-source";
import { Todo } from "../../entity/todo.entity";

const createTodo = async (req: Request, res: Response) => {
  const todoRepository = dataSource.getRepository(Todo);

  try {
    const { name, due_date, owner } = req.body;

    const newTodo = new Todo();

    newTodo.name = name;
    newTodo.due_date = due_date;
    newTodo.owner = owner;
    const todo = todoRepository.save(newTodo);
    res.status(200).json({
      status: "success",
      data: {
        todo,
      },
    });
  } catch {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export default createTodo;
