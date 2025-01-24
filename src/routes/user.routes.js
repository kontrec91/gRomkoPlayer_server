import Router from "express";
const router = new Router();
import userController from "../controllers/user.controller.js";

router.post("/registration", userController.createUser);
router.post("/login", userController.getOneUser);

export default router;
