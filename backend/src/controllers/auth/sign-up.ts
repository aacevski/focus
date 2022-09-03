import { Request, Response } from "express";

import dataSource from "../../data-source";
import { User } from "../../entity/user.entity";

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
    username: string;
  };

  const userRepository = dataSource.getRepository(User);

  try {
    const user = await userRepository.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    try {
      const newUser = new User();

      newUser.email = email;
      newUser.hashPassword(password);

      await userRepository.save(newUser);

      res.status(200).json({
        message: "success",
      });
    } catch {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  } catch {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
