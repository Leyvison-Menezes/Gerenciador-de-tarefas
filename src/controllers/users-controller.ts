import { Request, Response, NextFunction } from "express";

class UsersController{
    async create(request: Request, response: Response){
        return response.status(201).json({ message: "rota post funcionante!"})
    }
    async index(request: Request, response: Response){
        return response.status(201).json({ message: "rota get funcionante!"})
    }
}

export { UsersController }