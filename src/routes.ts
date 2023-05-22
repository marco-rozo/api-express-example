import { Router } from "express";
import authMiddleware from "./middlewares/authMiddleware";
import { authUserController } from "./useCases/AuthUser";
import { userController } from "./useCases/User";

const router = Router();

router.post("/auth", (request, response) => {
  return authUserController.index(request, response);
});

router.get("/users", authMiddleware, (request, response) => {
  return userController.getAll(request, response);
});

export default router;
