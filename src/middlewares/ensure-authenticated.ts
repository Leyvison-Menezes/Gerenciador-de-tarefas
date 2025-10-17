import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/app-error";
import { authConfig } from "@/config/auth";
import { verify } from "jsonwebtoken";

interface TokenPayLoad{
    role: string
    sub: string
}

function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    try {
        const authHeader = request.headers.authorization
        if(!authHeader){
            throw new AppError("JWT Token not found", 401)
        }

        // Padrão -> Bearer <token> (split em uma string devolve um array)
        const[, token] = authHeader.split(" ")
        const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPayLoad

        request.user = {
            id: user_id,
            role: role as "admin" | "member"
        }

        return next()
        
    } catch (error) {
        throw new AppError("Invalid JWT token", 401)
    }
}

export { ensureAuthenticated }