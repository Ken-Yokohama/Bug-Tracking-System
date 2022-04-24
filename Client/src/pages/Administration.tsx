import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UserProfile } from "../components";

const Administration = () => {
    const [cookies, setCookie, removeCookie] = useCookies<any>(["user"]);

    const [users, setUsers] = useState<any>([{}]);

    const [isAdmin, setIsAdmin] = useState<any>("checking");

    const verifyAdmin = async () => {
        const response = await axios.get(
            "https://ken-yokohama-mern-bug-tracker.herokuapp.com/getUsers",
            {
                headers: {
                    "x-access-token": cookies.AuthToken,
                    email: cookies.Email,
                },
            }
        );
        if (response.data != "Not Admin") {
            setUsers(response.data);
            setIsAdmin(true);
        } else {
            setUsers(null);
            setIsAdmin(false);
        }
    };

    useEffect(() => {
        verifyAdmin();
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
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        "@media (max-width: 1000px)": {
                            gridTemplateColumns: "1fr 1fr",
                        },
                        "@media (max-width: 700px)": {
                            gridTemplateColumns: "1fr",
                        },
                    }}
                >
                    {users?.map((user: any, index: number) => {
                        return (
                            <UserProfile
                                key={index}
                                id={user?._id}
                                email={user?.email}
                                role={user?.role}
                            />
                        );
                    })}
                </Box>
            ) : (
                <p>Access Denied, Please Use an Admin Account</p>
            )}
        </div>
    );
};

export default Administration;
