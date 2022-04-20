import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";

const Home = () => {
    const [cookies, setCookie, removeCookie] = useCookies<any>(["user"]);

    const checkAuthenticated = async () => {
        const response = await axios.get("http://localhost:3001/isUserAuth", {
            headers: {
                "x-access-token": cookies.AuthToken,
                email: cookies.Email,
            },
        });
        console.log(response.data);
    };

    return (
        <div>
            Home
            <br />
            <button onClick={checkAuthenticated}>Test JWT</button>
        </div>
    );
};

export default Home;
