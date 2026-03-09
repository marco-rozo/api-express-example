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

    // TODO: Criar uma classe base de erro (ex: AppError) em vez de utilizar apenas o Error nativo.
    // Isso permitirá identificar melhor o tipo de erro e aplicar tratamentos específicos
    // (como status HTTP, mensagens padronizadas e logging).
    if (!existUser) {
      throw new Error("User does not exist");
    }
    
    const passwordCrypt = bcrypt.hashSync(existUser.password!); 

    const isValidPassword = await bcrypt.compare(password, passwordCrypt);

    if (!isValidPassword) {
      throw new Error("Wrong credentials");
    }

    const token = jwt.sign({ id: existUser.id }, "secret", {
      expiresIn: "1d",
    });

    return fromAuthResponse(existUser, token);
  }
}
