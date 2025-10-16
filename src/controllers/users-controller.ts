import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { hash } from "bcrypt"
import z from "zod";
import { AppError } from "@/utils/app-error";

class UsersController{
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(2),
            email: z.email(),
            password: z.string().min(8)
        })
        const { name, email, password } = bodySchema.parse(request.body)

        // Antes de enviar a requisição de criação do usuário ao banco de dados:
        // 1. criptografar a senha.
        const hashedPassword = await hash(password, 8)
        // 2. verificar duplicidade de email.
        const userWithSameEmail = await prisma.user.findFirst({ where: { email }})
        if(userWithSameEmail){
            throw new AppError("Este email já está cadastrado")
        }

        const user = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
            },
        })

        // Separa a senha dos dados restantes através do spread operator para não retorná-la
        const { password: _, ...userWithoutPassword } = user


        return response.status(201).json(userWithoutPassword)
    }
    async index(request: Request, response: Response){
        return response.status(201).json({ message: "rota get funcionante!"})
    }
}

export { UsersController }