import jwt from "jsonwebtoken";
import { IAuthResponse, IAuthRequest, fromAuthResponse } from "././AuthUserDTO";
import bcrypt from "bcryptjs";
import { users } from "../../data/users";
import { IUser } from "../User/UserDTO";
// import { IUser } from "../../types/userInterface";

export class AuthUserService {
  constructor() {}

  async execute({
    email,
    password,
  }: IAuthRequest): Promise<Error | IAuthResponse> {

    const existUser: IUser | undefined  = users.find((e) => e.email == email);


    if (!existUser) {
      throw new Error("User does not exist");
    }
    
    existUser.password = bcrypt.hashSync(existUser.password!);

    const isValidPassword = await bcrypt.compare(password, existUser.password);
    
    if (!isValidPassword) {
      throw new Error("Wrong credentials");
    }

    const token = jwt.sign({ id: existUser.id }, "secret", {
      expiresIn: "1d",
    });

    return fromAuthResponse(existUser, token);
  }
}
