import { teamMembersRoutes } from "./team-members-routes";
import { sessionsRoutes } from "./sessions-routes";
import { tasksRoutes } from "./tasks-routes";
import { teamsRoutes } from "./teams-routes";
import { usersRoutes } from "./users-routes";
import { Router } from "express";
import { taskHistoryRoutes } from "./task-history-routes";

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/teams", teamsRoutes)
routes.use("/team-members", teamMembersRoutes)
routes.use("/tasks", tasksRoutes)
routes.use("/task-history", taskHistoryRoutes)

export { routes }