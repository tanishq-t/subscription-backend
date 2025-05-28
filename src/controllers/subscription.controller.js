import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Subscription from "../models/subscription.model.js";
import Plan from "../models/plan.model.js";

const createSubscription = asyncHandler(async (req, res) => {
    const { planId, endDate } = req.body;
    const userId = req.user._id;

    if (!planId || !endDate) {
        throw new ApiError(400, "Plan ID and End Date are required.");
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
        throw new ApiError(404, "Plan not found");
    }

    const newSubscription = await Subscription.create({
        userId,
        planId,
        endDate
    });

    return res.status(201).json(
        new ApiResponse(201, newSubscription, "Subscription created successfully")
    );
});


const getUserSubscription = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const subscriptions = await Subscription.find({ userId }).populate("planId");

    if (!subscriptions.length) {
        throw new ApiError(404, "No subscriptions found for this user");
    }

    return res.status(200).json(
        new ApiResponse(200, subscriptions, "Subscriptions fetched successfully")
    );
});


const updateSubscription = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const { planId, endDate, status } = req.body;

    const subscription = await Subscription.findOne({ userId });

    if (!subscription) {
        throw new ApiError(404, "Subscription not found");
    }

    if (planId) subscription.planId = planId;
    if (endDate) subscription.endDate = endDate;
    if (status) subscription.status = status;

    await subscription.save();

    return res.status(200).json(
        new ApiResponse(200, subscription, "Subscription updated successfully")
    );
});


const cancelSubscription = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const subscription = await Subscription.findOne({ userId });

    if (!subscription) {
        throw new ApiError(404, "Subscription not found");
    }

    if(subscription.status==="CANCELLED"){
        throw new ApiError(409, "Subscription already cancelled!");
    }
    subscription.status = "CANCELLED";
    await subscription.save();

    return res.status(200).json(
        new ApiResponse(200, subscription, "Subscription cancelled successfully")
    );
});


export {
    createSubscription,
    getUserSubscription,
    updateSubscription,
    cancelSubscription,
};