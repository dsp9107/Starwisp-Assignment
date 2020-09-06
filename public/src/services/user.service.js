import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:9107/api/universities";

class UserService {
    getUniversities() {
        return axios
            .get(API_URL + "/", { headers: authHeader() })
            .then((response) => {
                if (response.data.success) {
                    response.data.success.payload.forEach((uni) => {
                        uni.registration_date = uni.registration_date.slice(
                            0,
                            10
                        );
                        if (uni.expiry_date)
                            uni.expiry_date = uni.expiry_date.slice(0, 10);
                    });
                }
                return response;
            });
    }

    registerUniversity(uniDetails) {
        return axios
            .post(API_URL + "/new", uniDetails, { headers: authHeader() })
            .then((response) => {
                return response.data;
            });
    }

    updateUniversity(uniDetails) {
        uniDetails.university.registration_date = uniDetails.university.registration_date.slice(
            0,
            10
        );
        return axios
            .put(API_URL + `/update/${uniDetails.uid}`, uniDetails.university, {
                headers: authHeader(),
            })
            .then((response) => {
                return response.data;
            });
    }

    deleteUniversity(uniID) {
        return axios
            .delete(API_URL + `/delete/${uniID}`, { headers: authHeader() })
            .then((response) => {
                return response.data;
            });
    }
}

export default new UserService();
