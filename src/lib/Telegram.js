const { default: axios } = require("axios");

export class TelegramBot{
    
    #token;
    #api;

    constructor() {
        this.#token = process.env.TELEGRAM_TOKEN;
        this.#api = `https://api.telegram.org/bot${this.#token}`;
    }

    async #api_call(api) {
        try {
            const response = await axios.get(api);
            return response;
        } catch (err) {
            return err.response?.data || err;
        }
    }

    async sendMessage(chat_id, text) {
        const response = await this.#api_call(`${this.#api}/sendMessage?chat_id=${chat_id}&text=${text}`);
        return response;
    }
}