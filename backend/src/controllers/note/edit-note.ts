import { Request, Response } from "express";

import dataSource from "../../data-source";
import { Note } from "../../entity/note.entity";
import { setSuccess, tryAndCatchIt } from "../utils/res-helpers";

const editNote = async (req: Request, res: Response) => {
  const noteRepository = dataSource.getRepository(Note);

  tryAndCatchIt(res, async () => {
    const { id } = req.params;
    const { title, content, owner } = req.body;

    const note = await noteRepository.findOneByOrFail({
      id: parseInt(id),
    });

    note.title = title;
    note.content = content;
    note.owner = owner;

    const updatedNote = await noteRepository.save(note);
    setSuccess(res, updatedNote);
  });
};

export default editNote;
