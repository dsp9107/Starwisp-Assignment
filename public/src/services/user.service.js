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

    deleteUniversity(uniID) {
        return axios.delete(API_URL + `/delete/${uniID}`).then((response) => {
            return response.data;
        });
    }
}

export default new UserService();
