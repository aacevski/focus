import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import logger from "../../config/logger";
import { JWT_SECRET } from "../../constants/jwt";
import dataSource from "../../data-source";
import { User } from "../../entity/user.entity";

export const signIn = async (req: Request, res: Response) => {
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
      email: string;
      created_at: Date;
    } = {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    };

    try {
      const token = jwt.sign(jwtPayload, "andrej", {
        expiresIn: 60 * 30,
      });

      const { id, email, firstName, lastName, created_at, profilePicture } =
        user;

      res.status(200).json({
        status: "success",
        data: {
          token,
          user: {
            id,
            email,
            firstName,
            lastName,
            created_at,
            profilePicture,
          },
        },
      });
    } catch (error) {
      logger.error(error);

      res.status(500).json({
        error: "Internal server error",
      });
    }
  } catch (error) {
    logger.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};
