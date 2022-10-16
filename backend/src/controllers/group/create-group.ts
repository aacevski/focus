import { Request, Response } from "express";

import dataSource from "../../data-source";
import { Group } from "../../entity/Group.entity";

const createGroup = async (req: Request, res: Response) => {
  const groupRepository = dataSource.getRepository(Group);
  console.log(groupRepository);
  try {
    const { title, content, owner } = req.body;

    console.log(`${title} ${content} ${owner}`);
    const newGroup = new Group();

    newGroup.title = title;
    newGroup.content = content;
    newGroup.owner = owner;

    groupRepository.save(newGroup);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export default createGroup;
