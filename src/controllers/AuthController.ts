import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {
    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;
        console.log(req.body)

        // Simulando "Busca" usuário
        const user: any = {
            id: 1,
            email: "marco123@gmail.com",
            name: "Marco Antonio Rozo",
            password: "marco123"
        };

        if (!user) {
            return res.sendStatus(401);
        }

        // Simulando o password criptografado que estaria salvo no banco
        user.password = bcrypt.hashSync(user?.password);

        const isValidPassword = await bcrypt.compare(password, user.password);
        const isValidEmail = user.email == email;


        if (!isValidPassword || !isValidEmail) {
            return res.status(401).json();
        }

        // "Configurando" token jwt
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

        delete user.password;

        return res.json({
            user,
            token
        });
    }
}

export default new AuthController();