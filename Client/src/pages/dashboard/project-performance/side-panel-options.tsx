import { Box, Divider } from "@mui/material";
import React from "react";
import { SidePanelProps } from "./interface";

const SidePanelOptions = ({ Icon, title, data }: SidePanelProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
            }}
        >
            <Icon />
            <Divider orientation="vertical" flexItem />
            <Box>
                <h5 style={{ opacity: "0.4" }}>{title}</h5>
                <b>{data}</b>
            </Box>
        </Box>
    );
};

export default SidePanelOptions;
