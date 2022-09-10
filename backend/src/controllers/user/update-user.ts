import * as AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import * as dotenv from "dotenv";
import type { Request, Response } from "express";

import dataSource from "../../data-source";
import { User } from "../../entity/user.entity";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const updateUser = async (req: Request, res: Response) => {
  const profileImage = req.file;
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  const userRepository = dataSource.getRepository(User);

  try {
    if (profileImage) {
      const { buffer, originalname } = profileImage;

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `profile-pictures/${Date.now()}-${originalname}`,
        Body: buffer,
        ACL: "public-read",
      } as PutObjectRequest;

      const { Location } = await s3.upload(params).promise();

      await userRepository.update(id, {
        firstName,
        lastName,
        profilePicture: Location,
      });

      return res.status(200).json({
        status: "success",
        data: { profilePicture: Location, firstName, lastName },
      });
    }

    await userRepository.update(id, {
      firstName,
      lastName,
    });

    res.status(200).json({
      status: "success",
      data: { firstName, lastName },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default updateUser;
