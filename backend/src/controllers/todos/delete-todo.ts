import { Request, Response } from "express";

import dataSource from "../../data-source";
import { Todo } from "../../entity/todo.entity";

const deleteTodo = async (req: Request, res: Response) => {
  const todoRepository = dataSource.getRepository(Todo);

  try {
    const { id } = req.params;

    await todoRepository.delete(id);

    res.json({
      status: "success",
    });
  } catch {
    res.json({
      error: "Internal server error",
    });
  }
};

export default deleteTodo;
