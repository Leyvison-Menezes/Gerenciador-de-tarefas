import { Router } from "express";
import { TasksController } from "@/controllers/tasks-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { ensureRole } from "@/middlewares/ensure-role";

const tasksRoutes = Router()
const tasksController = new TasksController()

tasksRoutes.post("/", ensureAuthenticated, ensureRole(["admin"]), tasksController.create)
tasksRoutes.get("/:teamId", ensureAuthenticated, ensureRole(["admin"]), tasksController.index)
tasksRoutes.patch("/:id", ensureAuthenticated, ensureRole(["admin", "member"]), tasksController.update)
tasksRoutes.delete("/:id/:assignedTo", ensureAuthenticated, ensureRole(["admin"]), tasksController.delete)

export { tasksRoutes }