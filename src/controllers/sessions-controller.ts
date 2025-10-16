import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/app-error";
import { authConfig } from "@/config/auth";
import { prisma } from "@/database/prisma";
import { sign } from "jsonwebtoken"
import { compare } from "bcrypt"
import { z } from "zod";

class SessionsController{
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            email: z.email(),
            password: z.string().min(8),
        })
        const { email, password } = bodySchema.parse(request.body)

        // Recuperando o usuário
        const user = await prisma.user.findFirst({
            where: { email }
        })
        // Verificação do email
        if(!user){
            throw new AppError("Email ou senha incorretos", 401)
        }

        // Verificação da senha
        const passwordVerify = await compare(password, user.password)
        if(!passwordVerify){
            throw new AppError("Email ou senha incorretos", 401)
        }

        // Criando o token
        const { secret, expiresIn } = authConfig.jwt
        const token = sign({ role: user.role ?? "member" }, secret, { 
            subject: user.id,
            expiresIn,
        })

        const { password: hashedPassword, ...userWithoutPassword} = user

        return response.json({ token, user: userWithoutPassword })
    }
}

export { SessionsController }