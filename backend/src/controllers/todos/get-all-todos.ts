import { Request, Response } from "express";

import dataSource from "../../data-source";
import { Todo } from "../../entity/todo.entity";

const getAllTodos = async (req: Request, res: Response) => {
  const todoRepository = dataSource.getRepository(Todo);

  try {
    const todos = await todoRepository.find();

    res.status(200).json({
      status: "success",
      data: {
        todos,
      },
    });
  } catch {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export default getAllTodos;
