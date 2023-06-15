import React from "react";
import { Box } from "@mui/material";
import { LastUpdateProps } from "./interface";
import { formatDate } from "../../../utils/api";

const LastUpdate = ({ updatedAt }: LastUpdateProps) => {
    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "flex-end",
            }}
        >
            <span
                style={{
                    backgroundColor: "#EEF0F4",
                    color: "#686D76",
                    padding: "4px 6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    // borderRadius: "1rem",
                    borderRadius: "0.5rem",
                }}
            >
                {formatDate(updatedAt!)}
            </span>
        </Box>
    );
};

export default LastUpdate;
