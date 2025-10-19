import { Request, Response } from "express";
import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class TeamMembersController{
    async addMember(request: Request, response: Response){
        const bodySchema = z.object({
            user_id: z.string(),
            team_id: z.string()
        })
        const { user_id, team_id } = bodySchema.parse(request.body)

        // Verificando o usuário
        const user = await prisma.user.findUnique({ where: {id: user_id } })
        if(!user){
            throw new AppError("Usuário não encontrado", 404)
        }
        // Verificando o Team
        const team = await prisma.team.findUnique({ where: { id: team_id }})
        if(!team){
            throw new AppError("Time não encontrado", 404)
        }

        // Adiciona ao banco
        await prisma.teamMember.create({ data: {
            userId: user_id,
            teamId: team_id,
        }})

        return response.status(201).json({ 
            message: `O usuário ${user.name} foi adicionado ao time ${team.name}`
        })
    }
}

export { TeamMembersController }