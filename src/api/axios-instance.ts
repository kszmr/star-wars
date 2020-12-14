import Axios, {AxiosInstance} from 'axios';

const baseURL = 'https://swapi.dev/api';

export const getAxiosInstance = ():AxiosInstance => {
     let AxiosInstance = Axios.create({baseURL:baseURL});
     AxiosInstance.interceptors
     .response.use(response => response,
        (error) => {
            const {status} = error.response;
            if (status > 399) console.info(`API error. Status: ${status}`);
        }
        )
        return AxiosInstance;
}