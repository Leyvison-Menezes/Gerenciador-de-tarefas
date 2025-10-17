import { Request, Response } from "express";
import { AppError } from "@/utils/app-error";
import { authConfig } from "@/config/auth";
import { prisma } from "@/database/prisma";
import { sign } from "jsonwebtoken"
import { compare } from "bcrypt"
import { z } from "zod";

class TeamsController {
    async create(request: Request, response: Response){
        
        return response.status(201).json(request.user)
    }
}

export { TeamsController }