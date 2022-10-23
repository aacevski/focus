import { Request, Response } from "express";
import { Like } from "typeorm";

import dataSource from "../../data-source";
import { Group } from "../../entity/group.entity";

const getAllGroups = async (req: Request, res: Response) => {
  const groupRepository = dataSource.getRepository(Group);

  try {
    const { filterByTitle, filterByContent } = req.query;

    if (filterByTitle != null || filterByContent != null) {
      const groups = await groupRepository.findBy({
        title: Like(`%${filterByTitle ?? ""}%`),
        content: Like(`%${filterByContent ?? ""}%`),
      });
      res.status(200).json({
        status: "success",
        data: {
          groups,
        },
      });
      return;
    }

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
