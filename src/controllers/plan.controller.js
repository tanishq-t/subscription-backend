import { Plan } from "../models/plan.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createPlan = asyncHandler(async (req, res) => {
  const { name, price, features, durationInDays } = req.body;

  if (!name || !price || !durationInDays) {
    throw new ApiError(400, "Name, price, and duration are required");
  }

  const existingPlan = await Plan.findOne({ name });

  if (existingPlan) {
    throw new ApiError(409, "Plan with this name already exists");
  }

  const plan = await Plan.create({ name, price, features, durationInDays });

  return res.status(201).json(new ApiResponse(201, plan, "Plan created successfully"));
});



const getAllPlans = asyncHandler(async (req, res) => {
  const plans = await Plan.find({}).sort({ price: 1 });

  return res.status(200).json(new ApiResponse(200, plans, "Plans fetched successfully"));
});



const getPlanById = asyncHandler(async (req, res) => {
  const { planId } = req.params;

  const plan = await Plan.findById(planId);

  if (!plan) {
    throw new ApiError(404, "Plan not found");
  }

  return res.status(200).json(new ApiResponse(200, plan, "Plan fetched successfully"));
});



const updatePlan = asyncHandler(async (req, res) => {
  const { planId } = req.params;
  const updateData = req.body;

  const updatedPlan = await Plan.findByIdAndUpdate(planId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedPlan) {
    throw new ApiError(404, "Plan not found");
  }

  return res.status(200).json(new ApiResponse(200, updatedPlan, "Plan updated successfully"));
});



const deletePlan = asyncHandler(async (req, res) => {
  const { planId } = req.params;

  const deletedPlan = await Plan.findByIdAndDelete(planId);

  if (!deletedPlan) {
    throw new ApiError(404, "Plan not found");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Plan deleted successfully"));
});

export {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan
};
