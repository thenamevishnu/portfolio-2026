import axios from "axios";

export const POST = async (request) => {
    try {
        const body = await request.json();
        const ip = body?.id;
        if (!ip) {
            return Response.json({ message: "Identifier is required" }, { status: 400 });
        }
        const { data } = await axios.get(`${process.env.IP_INFO_API}/${ip}`);
        return Response.json({ message: "Details fetched", data }, { status: 200 });
    } catch (e) {
        return Response.json({ message: e.message || "Internal server error" }, { status: 500 });
    }
}