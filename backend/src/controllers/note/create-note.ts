import { Request, Response } from "express";

import dataSource from "../../data-source";
import { Note } from "../../entity/note.entity";

const createNote = async (req: Request, res: Response) => {
  const NoteRepository = dataSource.getRepository(Note);

  try {
    const { title, content, owner } = req.body;

    const note = new Note();

    note.title = title;
    note.content = content;
    note.owner = owner;

    const newNote = await NoteRepository.save(note);

    res.json({
      status: "success",
      data: {
        Note: newNote,
      },
    });
  } catch {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export default createNote;
