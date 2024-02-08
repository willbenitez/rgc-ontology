import { config } from './config';

export const get = async <T>(uri: string): Promise<T | null> => {
    const data = await fetch(`${config.api.gateway}${uri}`);
    if (data.ok) {
        const result = await data.json();
        return result as T;
    } else {
        throw new Error(await data.text());
    }
};

export const put = async <T>(uri: string, body: T): Promise<T | null> => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    };
    const data = await fetch(`${config.api.gateway}${uri}`, requestOptions);
    if (data.ok) {
        const result = await data.json();
        return result as T;
    } else {
        throw new Error(await data.text());
    }
};

export const post = async <T>(uri: string, body: T): Promise<T | null> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    };
    const data = await fetch(`${config.api.gateway}${uri}`, requestOptions);
    if (data.ok) {
        const result = await data.json();
        return result as T;
    } else {
        throw new Error(await data.text());
    }
};

export const del = async <T>(uri: string): Promise<T | null> => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };
    const data = await fetch(`${config.api.gateway}${uri}`, requestOptions);
    if (data.ok) {
        const result = await data.json();
        return result as T;
    } else {
        throw new Error(await data.text());
    }
};
