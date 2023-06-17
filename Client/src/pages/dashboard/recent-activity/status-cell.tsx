import React from "react";
import { Box } from "@mui/material";
import { StatusCellProps } from "./interface";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const StatusCell = ({ status }: StatusCellProps) => {
    const backgroundColor = () => {
        switch (status) {
            case "new":
                return "#F0FDFF";
            case "in progress":
                return "#ffe7c4";
            case "resolved":
                return "#EDF9E7";
            default:
                return "";
        }
    };

    const textColor = () => {
        switch (status) {
            case "new":
                return "#2e5c94";
            case "in progress":
                return "#9e6103";
            case "resolved":
                return "#3f7820";
            default:
                return "";
        }
    };

    const icon = () => {
        switch (status) {
            case "new":
                return <AddCircleOutlineIcon fontSize="small" />;
            case "in progress":
                return <AccessTimeIcon fontSize="small" />;
            case "resolved":
                return <CheckCircleOutlineIcon fontSize="small" />;
            default:
                return "";
        }
    };

    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "flex-end",
            }}
        >
            <span
                style={{
                    backgroundColor: backgroundColor(),
                    color: textColor(),
                    whiteSpace: "nowrap",
                    padding: "4px 6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    borderRadius: "1rem",
                    // borderRadius: "0.5rem",
                }}
            >
                {icon()}
                {status}
            </span>
        </Box>
    );
};

export default StatusCell;
