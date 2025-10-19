import { Request, Response } from "express";
import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class TeamsController {
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(2),
            description: z.string().nullable()
        })
        const { name, description } = bodySchema.parse(request.body)
        await prisma.team.create({
            data: {
                name,
                description
            }
        })
        return response.status(201).json()
    }

    async index(request: Request, response: Response){
        const teams = await prisma.team.findMany()

        return response.json(teams)
    }

    async update(request: Request, response: Response){
        const { id } = request.params
        const bodySchema = z.object({
            name: z.string(),
            description: z.string().nullable()
        })
        const { name, description } = bodySchema.parse(request.body)

        // Verificação
        const team = await prisma.team.findUnique({ where: { id }})
        if(!team){
            throw new AppError("Esse time não existe", 404)
        }

        // Update
        await prisma.team.update({ where: { id }, 
            data:{
                name,
                description
            }
        })
        return response.status(200).json()
    }

    async delete(request: Request, response: Response){
        const { id } = request.params
        const team = await prisma.team.findUnique({ where: { id }})
        if(!team){
            throw new AppError("Esse time não existe", 404)
        }
        // Deletar os membros
        await prisma.teamMember.deleteMany({ where: { teamId: id } })

        // Deletar as tarefas associadas
        // await prisma.task.deleteMany({ where: { teamId: id } })

        // Adotar no futuro uma dupla conformidade
        await prisma.team.delete({ where: { id }})

        return response.status(200).json()
    }
}

export { TeamsController }