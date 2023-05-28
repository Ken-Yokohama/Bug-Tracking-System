import axios from "axios";

export const register = async (body: object) => {
    const response = await axios.post(
        (process.env.REACT_APP_LOCAL_API_URL ||
            "https://ken-yokohama-mern-bug-tracker.onrender.com/") + "register",
        body
    );
    return response.data;
};

export const login = async (body: object) => {
    const response = await axios.post(
        (process.env.REACT_APP_LOCAL_API_URL ||
            "https://ken-yokohama-mern-bug-tracker.onrender.com/") + "login",
        body
    );
    return response.data;
};
