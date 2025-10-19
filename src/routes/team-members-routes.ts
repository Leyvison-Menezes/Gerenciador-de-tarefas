import { Router } from "express";
import { TeamMembersController } from "@/controllers/team-members-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { ensureRole } from "@/middlewares/ensure-role";

const teamMembersRoutes = Router()
const teamMembersController = new TeamMembersController()

teamMembersRoutes.post("/", ensureAuthenticated, ensureRole(["admin"]), 
teamMembersController.addMember)

export { teamMembersRoutes }