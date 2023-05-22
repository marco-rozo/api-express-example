import { users } from "../../data/users";
import { IUserResponse, fromUserResponse } from "./UserDTO";

export class UserService {
  constructor() {}

  async getAll(): Promise<Error | any> {
    const usersList: IUserResponse[] = [];

    users.forEach((e) => usersList.push(fromUserResponse(e)));

    return usersList;
  }
}
