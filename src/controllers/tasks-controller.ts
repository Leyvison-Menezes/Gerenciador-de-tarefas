import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class TasksController{
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(3),
            description: z.string().optional(),
            status: z.enum(["pending", "inProgress", "finished"]).optional(),
            priority: z.enum(["low", "medium", "high"]).optional(),
            teamId: z.string(),
            assignedTo: z.string()
        })
        const { name, description, status, priority, teamId, assignedTo } = bodySchema.parse(request.body)

        const team = await prisma.team.findUnique({ where: { id: teamId }})
        if(!team){
            throw new AppError("Esse time não foi encontrado!", 404)
        }
        const user = await prisma.user.findUnique({ where: { id: assignedTo }})
        if(!user){
            throw new AppError("Esse membro não foi encontrado!", 404)
        }
        const relation = await prisma.teamMember.findFirst({ where: { teamId, userId: assignedTo }})
        if(!relation){
            throw new AppError("Membro não encontrado neste time", 404)
        }

        const task = await prisma.task.create({ data: {
            name,
            description,
            status,
            priority,
            assignedTo,
            teamId,
        }})

        return response.status(201).json(task)
    }
     async index(request: Request, response: Response){
        const { teamId } = request.params
        const teamTasks = await prisma.task.findMany({ where: { teamId }, 
            select: {
                id: true,
                name: true,
                user: {
                   select:{
                    name: true
                   }
                },
                team: {
                    select:{
                        name: true,
                    }
                },
            },
        })
        if(teamTasks.length === 0){
            throw new AppError("Nenhuma tarefa foi encontrada para este time", 404)
        }

        return response.json(teamTasks)
     }

}
export { TasksController }