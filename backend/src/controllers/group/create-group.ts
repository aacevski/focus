import { Request, Response } from "express";

import dataSource from "../../data-source";
import { Group } from "../../entity/group.entity";

const createGroup = async (req: Request, res: Response) => {
  const groupRepository = dataSource.getRepository(Group);

  try {
    const { title, content, owner } = req.body;

    const group = new Group();

    group.title = title;
    group.content = content;
    group.owner = owner;

    const newGroup = groupRepository.save(group);

    res.json({
      status: "success",
      data: {
        group: newGroup,
      },
    });
  } catch {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export default createGroup;
