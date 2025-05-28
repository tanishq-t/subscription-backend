import { Router } from "express";
import {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan
} from "../controllers/plan.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllPlans);
router.get("/:planId", getPlanById);


router.post("/", verifyJWT, createPlan);
router.put("/:planId", verifyJWT, updatePlan);
router.delete("/:planId", verifyJWT, deletePlan);

export default router;
