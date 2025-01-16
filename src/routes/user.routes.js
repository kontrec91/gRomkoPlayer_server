import Router from "express";
const router = new Router();
import userController from "../controllers/user.controller.js";

router.post("/registration", userController.createUser);
// router.get("/", userController.getUsers);
// router.get("/user/:id", userController.getOneUser);
router.post("/login", userController.getOneUser);
// router.put("/update", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

export default router;
