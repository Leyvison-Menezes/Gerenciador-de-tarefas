import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/app-error";


function ensureRole (roles: ("admin" | "member")[]){
    return (request: Request, response: Response, next: NextFunction) => {
        if(!request.user){
            throw new AppError("Usuário não autenticado", 401)
        }
        if(!roles.includes(request.user.role)){
            throw new AppError("Permissão negada", 403)
        }
        return next()
    }
}
export { ensureRole }