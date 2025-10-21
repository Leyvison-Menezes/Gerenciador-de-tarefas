import { Router } from "express";
import { TaskHistory } from "@/controllers/task-history";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { ensureRole } from "@/middlewares/ensure-role";

const taskHistoryRoutes = Router()
const taskHistory = new TaskHistory()

taskHistoryRoutes.get("/:taskId", ensureAuthenticated, ensureRole(["admin"]), taskHistory.index)

export { taskHistoryRoutes }