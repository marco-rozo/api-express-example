import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

// Middleware para interceptação de rotas
// Objetivo: idsentificar e validar o toke jwt
export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        
        const data = jwt.verify(token, 'secret');
        console.log(data);
        const { id } = data as TokenPayload;

        req.userId = id;

        next();
    } catch {
        return res.sendStatus(401);
    }
}