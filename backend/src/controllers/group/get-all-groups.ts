import { Request, Response } from "express";

import dataSource from "../../data-source";
import { Group } from "../../entity/group.entity";

const getAllGroups = async (req: Request, res: Response) => {
  const groupRepository = dataSource.getRepository(Group);

  try {
    const groups = await groupRepository.find();

    res.status(200).json({
      status: "success",
      data: {
        groups,
      },
    });
  } catch {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export default getAllGroups;
