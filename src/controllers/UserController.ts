import { Request, Response } from "express";
import { users } from "../data/users";

class UserController {
    index(req: Request, res: Response) {
        return res.send({ userId: req.userId });
    }

    async getAll(req: Request, res: Response) {

        return res.send(users);
    }
}

export default new UserController();