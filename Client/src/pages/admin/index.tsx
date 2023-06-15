import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UserProfile } from "../../components";
import { getUsers } from "./service";

const Administration = () => {
    const [users, setUsers] = useState<any>([{}]);

    const [isAdmin, setIsAdmin] = useState<Boolean | string>("checking");

    const verifyAdmin = async () => {
        const response = await getUsers();
        if (response !== "Not Admin") {
            setUsers(response);
            setIsAdmin(true);
        } else {
            setUsers(null);
            setIsAdmin(false);
        }
    };

    useEffect(() => {
        verifyAdmin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {isAdmin === "checking" ? (
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
                                dateRegistered={user?.dateRegistered}
                                ipAddress={user?.ipAddress}
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
