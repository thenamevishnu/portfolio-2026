import { model, models, Schema } from "mongoose";

const reviewSchema = new Schema({
    uid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    picture: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true }
}, { timestamps: true });

export const Review = models.ClientReviews || model("ClientReviews", reviewSchema);
