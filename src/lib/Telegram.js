import axios from "axios";

export class TelegramBot {
    
    #token;
    #api;

    constructor() {
        this.#token = process.env.TELEGRAM_TOKEN;
        this.#api = `https://api.telegram.org/bot${this.#token}`;
    }

    async #api_call(url) {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (err) {
            return err.response?.data || err;
        }
    }

    async sendMessage(chat_id, text, parse_mode = "HTML") {
        const params = new URLSearchParams({
            chat_id: chat_id.toString(),
            text: text,
            parse_mode: parse_mode
        });

        const url = `${this.#api}/sendMessage?${params.toString()}`;
        return await this.#api_call(url);
    }
}