import { axiosInstance } from "./axiosInstance";

export const getLocations = () => {
    return axiosInstance.get('/location/getlocation');
}