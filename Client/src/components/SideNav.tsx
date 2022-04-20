import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import MenuOptions from "./MenuOptions";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import ConfirmationNumberTwoToneIcon from "@mui/icons-material/ConfirmationNumberTwoTone";
import AdminPanelSettingsTwoToneIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const SideNav = () => {
    const [cookies, setCookie, removeCookie] = useCookies<any>(["user"]);

    const logout = () => {
        removeCookie("Email", cookies.Email);
        removeCookie("AuthToken", cookies.AuthToken);
        window.location.reload();
    };

    const [toggleMenu, setToggleMenu] = useState<Boolean>(false);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                "@media(max-width: 700px)": {
                    position: "fixed",
                    backgroundColor: toggleMenu ? "white" : "none",
                    width: "100%",
                    height: "100%",
                },
            }}
        >
            <Box
                id="ShowHamburgur"
                sx={{
                    display: "none",
                    "@media(max-width: 700px)": {
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: "0.5rem 1rem",
                    },
                }}
            >
                {toggleMenu ? (
                    <CloseIcon
                        fontSize="large"
                        onClick={() => {
                            setToggleMenu((prevValue) => !prevValue);
                        }}
                    />
                ) : (
                    <MenuIcon
                        fontSize="large"
                        onClick={() => {
                            setToggleMenu((prevValue) => !prevValue);
                        }}
                    />
                )}
            </Box>
            <Box
                sx={{
                    "@media(max-width: 700px)": {
                        display: toggleMenu ? "inline-block" : "none",
                    },
                }}
            >
                <MenuOptions
                    label="DashBoard"
                    link="/"
                    Icon={HomeTwoToneIcon}
                    setToggleMenu={setToggleMenu}
                />
                <MenuOptions
                    label="Tickets"
                    link="/tickets"
                    Icon={ConfirmationNumberTwoToneIcon}
                    setToggleMenu={setToggleMenu}
                />
                <MenuOptions
                    label="Administration"
                    link="administration/"
                    Icon={AdminPanelSettingsTwoToneIcon}
                    setToggleMenu={setToggleMenu}
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
        </Box>
    );
};

export default SideNav;
