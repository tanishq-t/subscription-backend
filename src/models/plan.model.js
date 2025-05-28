import mongoose, { Schema } from "mongoose";

const planSchema = new Schema(
    {
        name:{
            type: String,
            required: true 
        },
        price:{ 
            type: Number,
            required: true
        },
        features: [{ type: String }],
        durationInDays:{
            type: Number,
            required: true
        },
    },
    { 
    timestamps: true 
    }
);

export default mongoose.model("Plan", planSchema);
