import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { compare, hash } from "bcrypt"
import { z } from "zod";
import { AppError } from "@/utils/app-error";

class SessionsController{
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            email: z.email(),
            password: z.string().min(8),
        })
        const { email, password } = bodySchema.parse(request.body)

        // Verificação do email
        const user = await prisma.user.findFirst({
            where: { email }
        })
        if(!user){
            throw new AppError("Email ou senha incorretos", 401)
        }

        // Verificação da senha
        const passwordVerify = await compare(password, user.password)
        if(!passwordVerify){
            throw new AppError("Email ou senha incorretos", 401)
        }

        return response.json({ message: "ok"})
    }
}

export { SessionsController }