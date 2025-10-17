import { Request, Response } from "express";
import { AppError } from "@/utils/app-error";
import { authConfig } from "@/config/auth";
import { prisma } from "@/database/prisma";
import { sign } from "jsonwebtoken"
import { compare } from "bcrypt"
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
}

export { TeamsController }