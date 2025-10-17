import { sessionsRoutes } from "./sessions-routes";
import { teamsRoutes } from "./teams-routes";
import { usersRoutes } from "./users-routes";
import { Router } from "express";

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/teams", teamsRoutes)

export { routes }