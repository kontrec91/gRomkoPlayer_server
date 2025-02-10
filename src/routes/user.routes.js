import Router from "express";
import userController from "../controllers/user.controller.js";

const router = new Router();

router.post("/registration", userController.createUser);
router.post("/login", userController.getOneUser);
router.delete("/logout", userController.logout);

export default router;
