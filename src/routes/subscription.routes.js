import { Router } from "express";
import {
    createSubscription,
    getUserSubscription,
    updateSubscription,
    cancelSubscription
  } from "../controllers/subscription.controller.js";

import { getAllPlans } from "../controllers/plan.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/subscriptions", verifyJWT, createSubscription);
router.get("/subscriptions/:userId", verifyJWT, getUserSubscription);
router.put("/subscriptions/:userId", verifyJWT, updateSubscription);
router.delete("/subscriptions/:userId", verifyJWT, cancelSubscription);

export default router;