import { Request, Response } from "express";

import dataSource from "../../data-source";
import { Note } from "../../entity/note.entity";
import { setSuccess, tryAndCatchIt } from "../utils/res-helpers";

const createNote = async (req: Request, res: Response) => {
  const noteRepository = dataSource.getRepository(Note);

  tryAndCatchIt(res, async () => {
    const { title, content, owner } = req.body;

    const note = new Note();

    note.title = title;
    note.content = content;
    note.owner = owner;

    const newNote = await noteRepository.save(note);

    setSuccess(res, newNote);
  });
};

export default createNote;
