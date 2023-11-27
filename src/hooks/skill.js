import { axiosInstance } from "./axiosInstance";

export const getSkills = () => axiosInstance.post("/skillroute/getallSkills");