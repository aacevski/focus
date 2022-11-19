import { Request, Response } from "express";

import dataSource from "../../data-source";
import { Note } from "../../entity/note.entity";
import { setSuccess, tryAndCatchIt } from "../utils/res-helpers";

const deleteNote = async (req: Request, res: Response) => {
  const noteRepository = dataSource.getRepository(Note);

  tryAndCatchIt(res, async () => {
    const { id } = req.params;

    await noteRepository.delete(id);
    setSuccess(res);
  });
};

export default deleteNote;
