import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import { JWT_SECRET } from "../../constants/jwt";
import dataSource from "../../data-source";
import { User } from "../../entity/user.entity";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userRepository = dataSource.getRepository(User);

  try {
    const user = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (!user.isPasswordCorrect(password)) {
      return res.status(401).json({
        error: "Wrong password",
      });
    }

    const jwtPayload: {
      id: number;
      username: string;
      email: string;
      created_at: Date;
    } = {
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
    };

    try {
      const token = jwt.sign(jwtPayload, JWT_SECRET!, {
        expiresIn: 60 * 30,
      });

      res.status(200).json({
        token,
      });
    } catch {
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  } catch {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
