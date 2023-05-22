import { Request, Response } from "express";
import { UserService } from "./UserService";

export class UserController {

  constructor(private userService: UserService) {}

  async getAll(req: Request, res: Response) {

    try {
      const response = await this.userService.getAll();

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}
