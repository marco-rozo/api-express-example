import { IUser, IUserResponse, fromUserResponse } from "../User/UserDTO";


export function fromAuthResponse(user: IUser, token: string): IAuthResponse {
  let authResponse: IAuthResponse = {
    user: fromUserResponse(user),
    token: token,
  };

  return authResponse;
}


export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUserResponse;
  token: string;
}
