import { Request, Response } from "express";

import dataSource from "../../data-source";
import { Group } from "../../entity/group.entity";
import { Note } from "../../entity/note.entity";
import { setSuccess, tryAndCatchIt } from "../utils/res-helpers";

const addNoteToGroup = async (req: Request, res: Response) => {
  const noteRepository = dataSource.getRepository(Note);
  const groupRepository = dataSource.getRepository(Group);

  tryAndCatchIt(res, async () => {
    const { noteId, groupId } = req.params;
    const note = await noteRepository.findOneByOrFail({
      id: parseInt(noteId),
    });
    const group = await groupRepository.findOneByOrFail({
      id: parseInt(groupId),
    });

    note.group = group;
    noteRepository.save(note);
    setSuccess(res, note);
  });
};

export default addNoteToGroup;
