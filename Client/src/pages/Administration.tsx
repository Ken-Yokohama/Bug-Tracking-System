import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Administration = () => {
    const [cookies, setCookie, removeCookie] = useCookies<any>(["user"]);

    const [users, setUsers] = useState<any>([{}]);

    const [isAdmin, setIsAdmin] = useState<any>("checking");

    const verifyAdmin = async () => {
        const response = await axios.get("http://localhost:3001/getUsers", {
            headers: {
                "x-access-token": cookies.AuthToken,
                email: cookies.Email,
            },
        });
        if (response.data != "Not Admin") {
            setUsers(response.data);
            setIsAdmin(true);
        } else {
            setUsers(null);
            setIsAdmin(false);
        }
    };

    useEffect(() => {
        // verifyAdmin();
    }, []);

    return (
        <div>
            <Box
                id="Padding for Menu"
                sx={{
                    "@media(max-width: 700px)": {
                        height: "3.1rem",
                    },
                }}
            ></Box>
            {isAdmin == "checking" ? (
                <p>Verifying Admin...</p>
            ) : isAdmin ? (
                <p>You are an Admin</p>
            ) : (
                <p>Access Denied, Please Use an Admin Account</p>
            )}
        </div>
    );
};

export default Administration;
