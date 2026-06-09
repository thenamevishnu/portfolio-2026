import { Review } from "@/models/review.model";

export const POST = async (request) => {
    try {
        const body = await request.json();
        console.log(body)
        const existedReview = await Review.findOne({ email: body.email });
        if (existedReview) {
            existedReview.title = body.title;
            existedReview.description = body.description;
            existedReview.rating = body.rating;
            existedReview.picture = body.picture;
            await existedReview.save();
            return Response.json({ message: "Your review has been updated.", review: existedReview }, { status: 200 });
        }
        const response = await Review.create(body);
        if (!response?._id) {
            return Response.json({ message: "Unable to create your review now. Please try again later." }, { status: 400 });
        }
        return Response.json({ message: "Your review has been added.", review: response }, { status: 201 });
    } catch (e) {
        console.log(e)
        return Response.json({ message: e.message || "Internal Server Error" }, { status: 500 });
    }
}

export const GET = async () => {
    try {
        const reviews = await Review.find({}, { email: 0 }).sort({ createdAt: -1 });
        return Response.json(reviews, { status: 200 });
    } catch (e) {
        return Response.json({ message: e.message || "Internal Server Error" }, { status: 500 });
    }
}

export const DELETE = async (request) => {
    try {
        const params = request.nextUrl.searchParams;
        const id = params.get("id");
        if (!id) {
            return Response.json({ message: "ID is required." }, { status: 400 });
        }
        await Review.deleteOne({ uid: id });
        return Response.json({ message: "Review has been deleted." }, { status: 200 });
    } catch (e) {
        return Response.json({ message: e.message || "Internal Server Error" }, { status: 500 });
    }
}