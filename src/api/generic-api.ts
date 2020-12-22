import Axios, { AxiosResponse } from 'axios';
import {getAxiosInstance} from './axios-instance';

export type SWAPIEndpoint = 'people' | 'films' | 'starships' | 'vehicles' | 'species' | 'planets';

export interface PageData {
    next: number | null | undefined;
    previous: number | null;
    total: number;
    totalRegisters: number;
}

export interface PageableResponse<T> {
    data: T[];
    page: PageData;
}

export interface ResourceReturn<T> {
    getSchema: () => void;
    getById: (id: number) => Promise<T>;
    getAll: (page: number) => Promise<PageableResponse<T>>
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

    const getAll = async (pageNumber: number) : Promise<PageableResponse<T>> => {
        const response = await axios.get(`/${endpoint}/?page=${pageNumber}`);
        const data: T[] = response.data.results;
        const page: PageData = getPageData(response);
        return {page, data}
    }

    const getByPartialName = async (search: string, pageNumber: number): Promise<PageableResponse<T>> => {
        const response = await axios.get(`/${endpoint}/?search=${search}&page=${pageNumber}`);
        const data: T[] = (response.data.results);
        const page: PageData = getPageData(response);
        return {page, data};
    }

    const getPageData = (response: AxiosResponse):PageData => {
        const next: number | null = getPageNumber(response.data.next);
        const previous: number | null = getPageNumber(response.data.previous);
        const resultSize = response.data.results.length;
        const count = response.data.count;
        const total: number = (count % resultSize) === 0 ? (count / resultSize) : Math.floor(count / resultSize) + 1;

        return {next, previous, total, totalRegisters: count}
    }

    const getPageNumber = (url: string|null) : number|null => {
        if (!url) return null;
        const matches = url.match('page=\\d+');
        if (matches) return parseInt(matches [0].replace('page=',''));
        return null;
    }

    return {getSchema, getById, getAll}
}