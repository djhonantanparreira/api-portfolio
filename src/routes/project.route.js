import { Router } from "express";
const router = Router();

import { createProject, findAllProjects, findByIdProject, updateProject, deleteProject } from "../controllers/project.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { isAdmin } from "../middlewares/admin.middlewares.js";

router.post("/", authMiddleware, isAdmin, createProject);
router.get("/", findAllProjects);
router.get("/:id", authMiddleware, findByIdProject);
router.patch("/:id", authMiddleware, isAdmin, updateProject);
router.delete("/:id", authMiddleware, isAdmin, deleteProject)

export default router;