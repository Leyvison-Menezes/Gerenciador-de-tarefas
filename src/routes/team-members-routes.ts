import { Router } from "express";
import { TeamMembersController } from "@/controllers/team-members-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { ensureRole } from "@/middlewares/ensure-role";

const teamMembersRoutes = Router()
const teamMembersController = new TeamMembersController()

teamMembersRoutes.post("/", ensureAuthenticated, ensureRole(["admin"]), teamMembersController.addMember)
teamMembersRoutes.get("/", ensureAuthenticated, ensureRole(["admin"]), teamMembersController.index)
teamMembersRoutes.delete("/:teamId/:userId", ensureAuthenticated, ensureRole(["admin"]), teamMembersController.deleteMember)

export { teamMembersRoutes }