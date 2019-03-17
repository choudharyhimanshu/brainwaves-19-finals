import {config} from "../config";
import {ISearchRequest} from "../components/Search";
import SGMessage from "../models/SGMessage";

class MessagesService {

    private apiBase: string;

    constructor(apiBase: string) {
        this.apiBase = apiBase;
    }

    async search(searchRequest: ISearchRequest): Promise<SGMessage[]> {
        const url = new URL(`${this.apiBase}/search`);
        url.searchParams.append('Key_20', searchRequest.ref);
        url.searchParams.append('Key_30T', searchRequest.tradeDateRange);
        url.searchParams.append('status', searchRequest.status);

        const response = await fetch(url.href);

        if (response && response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }

    async getSgMessageByRef(ref: string): Promise<SGMessage> {
        const url = new URL(`${this.apiBase}/sg/${ref}`);

        const response = await fetch(url.href);

        if (response && response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }


    async getClientMessageByRef(ref: string): Promise<SGMessage> {
        const url = new URL(`${this.apiBase}/client/${ref}`);

        const response = await fetch(url.href);

        if (response && response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }

}

export default new MessagesService(config.messagesApiBase);
