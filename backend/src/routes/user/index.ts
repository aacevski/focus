import { Router } from "express";
import * as multer from "multer";

import updateUser from "../../controllers/user/update-user";

const router = Router();
const upload = multer();

router.put("/:id", upload.single("profilePicture"), updateUser);

export default router;
