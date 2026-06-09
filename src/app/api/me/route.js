import { db } from "@/lib/mongoose";
import { Me } from "@/models/info.model";

export const GET = async () => {
    try {
        await db.connect();
        const myInfo = await Me.findOne();
        return Response.json(myInfo, { status: 200 });
    } catch (e) {
        return Response.json({ message: e.message || "Internal server error" }, { status: 500 });
    }
}