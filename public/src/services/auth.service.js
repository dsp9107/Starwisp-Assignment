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
                if (response.data.success) {
                    window.localStorage.setItem(
                        "user",
                        JSON.stringify({
                            username,
                            token: response.data.success.payload,
                        })
                    );
                }

                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
    }

    logout() {
        window.localStorage.removeItem("user");
    }

    getCurrentUser() {
        const item = window.localStorage.getItem("user");
        return item !== null ? JSON.parse(item).username : null;
    }
}

export default new AuthService();
