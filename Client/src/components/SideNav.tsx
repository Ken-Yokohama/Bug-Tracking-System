import { Box, Button } from "@mui/material";
import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import MenuOptions from "./MenuOptions";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import ConfirmationNumberTwoToneIcon from "@mui/icons-material/ConfirmationNumberTwoTone";
import AdminPanelSettingsTwoToneIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";

const SideNav = () => {
    const [cookies, setCookie, removeCookie] = useCookies<any>(["user"]);

    const logout = () => {
        removeCookie("Email", cookies.Email);
        removeCookie("AuthToken", cookies.AuthToken);
        window.location.reload();
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <MenuOptions label="DashBoard" link="/" Icon={HomeTwoToneIcon} />
            <MenuOptions
                label="Tickets"
                link="/tickets"
                Icon={ConfirmationNumberTwoToneIcon}
            />
            <MenuOptions
                label="Administration"
                link="administration/"
                Icon={AdminPanelSettingsTwoToneIcon}
            />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.5rem",
                }}
            >
                <Button variant="contained" color="error" onClick={logout}>
                    Logout
                </Button>
            </Box>
        </Box>
    );
};

export default SideNav;
