import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        planId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true, ref: "Plan"
        },
        status:{
            type: String,
            enum: ["ACTIVE", "INACTIVE", "CANCELLED", "EXPIRED"],
            default: "ACTIVE"
        },
        startDate:{
            type: Date,
            default: Date.now
        },
        endDate:{
            type: Date,
            required: true
        }
    },
    { 
        timestamps: true 
    }
);

subscriptionSchema.virtual("isExpired").get(function () {
    return new Date() > this.endDate;
});

subscriptionSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Subscription", subscriptionSchema);
