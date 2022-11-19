import { Response } from "express";

import dataSource from "../../data-source";
import { Note } from "../../entity/note.entity";
import { setSuccess, tryAndCatchIt } from "../utils/res-helpers";

const getAllNotes = async (res: Response) => {
  const noteRepository = dataSource.getRepository(Note);

  tryAndCatchIt(res, async () => {
    const todos = await noteRepository.find();
    setSuccess(res, todos);
  });
};

export default getAllNotes;
