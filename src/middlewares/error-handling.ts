import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/app-error";
import { ZodError, z } from "zod";

export function ErrorHandling(error: any, request: Request, response: Response, next: NextFunction){
    if(error instanceof AppError){
        //Caso ocorra algo inesperado, o app para e lança uma excessão, conforme o APPError
        return response.status(error.statusCode ?? 500).json({ message: error.message })
    }
    if(error instanceof ZodError){
        //Para Erros de Validação
        return response.status(400).json({ message: "Validation Error", issues: z.treeifyError(error) })
    }
    return response.status(500).json({ message: error.message })
}

