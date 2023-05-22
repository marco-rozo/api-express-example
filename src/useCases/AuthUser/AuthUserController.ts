import { Request, Response } from "express";
import { AuthUserService } from "./AuthUserService";

export class AuthUserController {

  constructor(private authUserService: AuthUserService) {}

  async index(req: Request, res: Response) {

    try {
      const response = await this.authUserService.execute(req.body);

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json();
    }
  }
}
