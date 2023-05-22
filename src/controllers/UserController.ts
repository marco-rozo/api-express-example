import { Request, Response } from "express";

class UserController {
    index(req: Request, res: Response) {
        return res.send({ userId: req.userId });
    }

    async getAll(req: Request, res: Response) {

        const users: any = [
            {
                id: 1,
                email: "marco123@gmail.com",
            },
            {
                id: 2,
                email: "usuario123@gmail.com",
            }
        ];

        return res.send(users);
    }
}

export default new UserController();