import axios, { AxiosResponse } from 'axios';

const baseUrl = 'http://localhost:3000/api'

export enum Method {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
    PATCH = 'PATCH',
}

enum ContentType {
    JSON = 'application/json; charset=utf-8',
}

interface Headers {
    'Content-Type'?: ContentType;
}

interface ApiClient {
    get(url): Promise<any>;
    post(url, data): Promise<any>;
    delete(url): Promise<any>;
    put(url, data): Promise<any>;
}

class Client implements ApiClient {
    private token: string = '';

    public setAccessToken(token: string) {
        this.token = token;
    }

    public async get(url): Promise<any> {
        return this.call({ url, method: Method.GET });
    }

    public async post(url, data): Promise<any> {
        return await this.call({
            url,
            method: Method.POST,
            headers: { 'Content-Type': ContentType.JSON },
            data,
        });
    }

    public async put(url, data): Promise<any> {
        return await this.call({
            url,
            method: Method.PUT,
            headers: { 'Content-Type': ContentType.JSON },
            data,
        });
    }

    public async delete(url): Promise<any> {
        return await this.call({ url, method: Method.DELETE });
    }

    private async call({ url, method, headers, data }: {
        url: string,
        method: Method,
        headers?: Headers,
        data?: any,
    }): Promise<any> {
        const authHeader = { 'Authorization': `Bearer ${this.token}` };
        try {
            const response = await axios(`${baseUrl}${url}`, {
                method,
                timeout: 10000,
                headers: {
                    ...authHeader,
                    ...headers,
                },
                data: JSON.stringify(data),
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

const client = new Client();

export { client };
