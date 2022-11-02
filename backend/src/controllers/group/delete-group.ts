import { Request, Response } from "express";

import dataSource from "../../data-source";
import { Group } from "../../entity/group.entity";

const deleteGroup = async (req: Request, res: Response) => {
  const groupRepository = dataSource.getRepository(Group);

  try {
    const { id } = req.params;
    await groupRepository.delete(id);

    res.json({
      status: "success",
    });
  } catch {
    res.json({
      error: "Internal server error",
    });
  }
};

export default deleteGroup;
