import axios from "axios";
// import authHeader from "./auth-header";

const API_URL = "http://localhost:9107/api/universities";

class UserService {
    getUniversities() {
        return axios.get(API_URL + "/");
    }

    registerUniversity(uniDetails) {
        return axios.post(API_URL + "/new", uniDetails).then((response) => {
            return response.data;
        });
    }

    // getUserBoard() {
    //     return axios.get(API_URL + "user", { headers: authHeader() });
    // }

    // getModeratorBoard() {
    //     return axios.get(API_URL + "mod", { headers: authHeader() });
    // }

    // getAdminBoard() {
    //     return axios.get(API_URL + "admin", { headers: authHeader() });
    // }
}

export default new UserService();
