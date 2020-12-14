import {getAxiosInstance} from './axios-instance';

export type SWAPIEndpoint = 'people' | 'films' | 'starships' | 'vehicles' | 'species' | 'planets';

export interface ResourceReturn<T> {
    getSchema: () => void;
    getById: (id: number) => Promise<T>;
}

export const genericController = <T> (endpoint: SWAPIEndpoint): ResourceReturn<T> => {
    const axios = getAxiosInstance();

    const getSchema = async () => {
        const response = await axios.get(`/${endpoint}/schema`);
        return response.data;
    }
    const getById = async (id:number): Promise<T> => {
        const response = await axios.get(`/${endpoint}/${id}`)
        return response.data;
    }

    return {getSchema, getById}
}