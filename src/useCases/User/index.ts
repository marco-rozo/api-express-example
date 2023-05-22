import { UserController } from "./UserController";
import { UserService } from "./UserService";

const userService = new UserService();

const userController = new UserController(userService);

export { userService, userController };
