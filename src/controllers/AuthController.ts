import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from "../data/users";
import { IUser, IUserResponse, fromUserResponse } from "../types/userInterfaceDTO";

class AuthController {
    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;

        // Simulando "Busca" usuário
        const userExist: IUser | undefined = users.find(e=> e.email == email);

        if (!userExist) {
            return res.sendStatus(401);
        }

        // Simulando o password criptografado que estaria salvo no banco
        userExist.password = bcrypt.hashSync(userExist?.password!);

        const isValidPassword = await bcrypt.compare(password, userExist.password);
        const isValidEmail = userExist.email == email;

        if (!isValidPassword || !isValidEmail) {
            return res.status(401).json();
        }

        // "Configurando" token jwt
        const token = jwt.sign({ id: userExist.id }, 'secret', { expiresIn: '1d' });

        // Utilizando o DTO para mapear os dados do usuário 
        // para retornar apenas o necessário (removendo id e password do objeto)
        const user: IUserResponse = fromUserResponse(userExist);

        return res.json({
            user,
            token
        });
    }
    
}

export default new AuthController();