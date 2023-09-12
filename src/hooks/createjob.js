import axios from "axios";

export function createJob(_data){
    return axios.post('https://wroots-backend.onrender.com/createJob',_data);
}