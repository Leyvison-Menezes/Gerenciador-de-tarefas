import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class TaskHistory{
    async index(request: Request, response: Response){
        const { taskId } = request.params
        const currentTask = await prisma.taskHistory.findMany({ where: { taskId },
        select: {
            id: true,
            task: { select: {
                name: true,
                id: true,
            }},
            changed: { select: {
                name: true,
                id: true
            }},
            changedAt:true,
            oldStatus: true,
            newStatus: true
        }, 
        orderBy: { changedAt: 'desc'}
    })
    
        if(currentTask.length === 0){
            throw new AppError("Não foram encontrados logs para esta tarefa", 404)
        }
        return response.json(currentTask)
    }
}
export { TaskHistory }