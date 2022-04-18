import React from "react";
import { useCookies } from "react-cookie";

const SideNav = () => {
    const [cookies, setCookie, removeCookie] = useCookies<any>(["user"]);

    const logout = () => {
        removeCookie("Email", cookies.Email);
        removeCookie("AuthToken", cookies.AuthToken);
        window.location.reload();
    };

    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default SideNav;
