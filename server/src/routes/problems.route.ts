import { Hono } from "hono";
import { authMiddleware, checkAdmin } from "../middleware/auth.middleware";
import {
  createProblem,
  deleteProblemById,
  getAllProblems,
  getAllProblemsSolvedByUser,
  getProblemById,
  updateProblemById,
} from "../controllers/problems.controller";

const problemRoutes = new Hono();

problemRoutes.post(
  "/create-problem",
  authMiddleware,
  checkAdmin,
  createProblem,
);
problemRoutes.get("/get-all-problems", authMiddleware, getAllProblems);
problemRoutes.get("/get-problem/:id", authMiddleware, getProblemById);
problemRoutes.put(
  "/update-problem/:id",
  authMiddleware,
  checkAdmin,
  updateProblemById,
);
problemRoutes.delete(
  "/delete-problem/:id",
  authMiddleware,
  checkAdmin,
  deleteProblemById,
);
problemRoutes.get(
  "/get-solved-problems",
  authMiddleware,
  getAllProblemsSolvedByUser,
);

export default problemRoutes;
