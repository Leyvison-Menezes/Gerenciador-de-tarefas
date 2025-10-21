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

    async index(request: Request, response: Response){
        const teamMembers = await prisma.teamMember.findMany({ select: {
            id: true,
            team: { select: { name: true, id: true }},
            user: { select: { name: true, id: true }}
        }})

        return response.status(200).json(teamMembers)

    }

    async deleteMember(request: Request, response: Response){
        const { teamId, userId } = request.params
        // Verifica se o usuário está naquele time
        const relation = await prisma.teamMember.findFirst({ where: { teamId, userId }})
        if(!relation){
            throw new AppError("Membro não encontrado neste time", 404)
        }

        // Deleta as tarefas associadas ao membro
        // await prisma.task.deleteMany({ where: { 
        //     teamId,
        //     assignedTo: userId
        // }})

        await prisma.teamMember.deleteMany({ where: {
            teamId, userId
        }})

        return response.status(200).json()
    }
}

export { TeamMembersController }