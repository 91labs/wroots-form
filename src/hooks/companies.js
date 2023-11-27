import { axiosInstance } from "./axiosInstance";

export const getCompanies = () => {
    return axiosInstance.get('/hiringcompany/getallCompany');
}