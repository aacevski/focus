import { Request, Response } from "express";

import dataSource from "../../data-source";
import { Group } from "../../entity/group.entity";
import { Todo } from "../../entity/todo.entity";

const addTodoToGroup = async (req: Request, res: Response) => {
  const todoRepository = dataSource.getRepository(Todo);
  const groupRepository = dataSource.getRepository(Group);

  try {
    const { todoId, groupId } = req.params;
    const todo = await todoRepository.findOneByOrFail({
      id: parseInt(todoId),
    });
    const group = await groupRepository.findOneByOrFail({
      id: parseInt(groupId),
    });

    todo.group = group;
    todoRepository.save(todo);

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

export default addTodoToGroup;
