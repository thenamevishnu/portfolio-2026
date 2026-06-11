export const proxy = (request) => {
    try {
        if (request.nextUrl.pathname == "/api/me") {
            const cookie = request.headers.get("authorization");
            console.log(cookie)
        }
    } catch (e) {
        return Response.json({ message: e.message || "Internal server error" }, { status: 500 });
    }
}