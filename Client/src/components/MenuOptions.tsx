import { Box } from "@mui/material";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

interface props {
    link: string;
    label: string;
    Icon: any;
    setToggleMenu: any;
}

const MenuOptions = ({ link, label, Icon, setToggleMenu }: props) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                padding: "1rem",
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                ":hover": {
                    backgroundColor: "#DCDCDC",
                    cursor: "pointer",
                },
            }}
            onClick={() => {
                navigate(link);
                setToggleMenu(false);
            }}
        >
            <Icon />
            <h3 style={{ fontWeight: "100" }}>{label}</h3>
        </Box>
    );
};

export default MenuOptions;
