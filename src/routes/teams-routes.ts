import { Router } from "express";
import { TeamsController } from "@/controllers/teams-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { ensureRole } from "@/middlewares/ensure-role";

const teamsRoutes = Router()
const teamsController = new TeamsController()

teamsRoutes.post("/", ensureAuthenticated, ensureRole(["admin"]), teamsController.create)
teamsRoutes.get("/", ensureAuthenticated, ensureRole(["admin"]), teamsController.index)
teamsRoutes.patch("/:id", ensureAuthenticated, ensureRole(["admin"]), teamsController.update)
teamsRoutes.delete("/:id", ensureAuthenticated, ensureRole(["admin"]), teamsController.delete)

export { teamsRoutes }