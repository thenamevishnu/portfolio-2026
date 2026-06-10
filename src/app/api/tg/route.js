import { TelegramBot } from "@/lib/Telegram";

export const GET = async (request) => {
    try {
        const params = request.nextUrl.searchParams;
        console.log(params)
        const message = params.get("message");
        const api = new TelegramBot();
        console.log(await api.sendMessage(process.env.TELEGRAM_CHAT_ID, message))
        return Response.json({ message: "Your query has been forwarded." }, { status: 200 });
    } catch (e) {
        return Response.json({ message: e.message || "Internal server error" }, { status: 500 });
    }
}