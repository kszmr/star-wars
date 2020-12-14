import {getAxiosInstance} from './axios-instance';

export type SWAPIEndpoint = 'people' | 'films' | 'starships' | 'vehicles' | 'species' | 'planets';

export interface ResourceReturn {
    getSchema: () => void;
    getById: (id: number) => Promise<any>;
}

export const genericController = (endpoint: SWAPIEndpoint) => {
    const axios = getAxiosInstance();

    const getSchema = async () => {
        const response = await axios.get(`/${endpoint}/schema`);
        return response.data;
    }
    const getById = async (id:number) => {
        const response = await axios.get(`/${endpoint}/${id}`)
        return response.data;
    }

    return {getSchema, getById}
}