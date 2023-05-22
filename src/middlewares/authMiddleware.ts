import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

// função para proteção de rotas
export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    // valida o token
    const { authorization } = req.headers;

    if (!authorization) {
        return res.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        // verifica e decodifica o token
        const data = jwt.verify(token, 'secret');
        const { id } = data as TokenPayload;

        // passa o id do usuário para o req criando um namespace e adicionando a propriedade desejada na interface onde precisa
        req.userId = id;

        next();
    } catch {
        return res.status(401).json();
    }
}