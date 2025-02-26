import axios from "axios";

export function createJob(_data){
    return axios.post('https://api.wraeglobal.com/createJob',_data);
}