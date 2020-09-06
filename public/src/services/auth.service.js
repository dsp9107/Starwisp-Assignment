import axios from "axios";

const API_URL = "http://localhost:9107/api/users";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "/login", {
                username,
                password,
            })
            .then((response) => {
                console.log(response);
                if (response.data.payload) {
                    window.localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        window.localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(window.localStorage.getItem("user"));
    }
}

export default new AuthService();
