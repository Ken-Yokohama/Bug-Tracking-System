import { Box } from "@mui/material";
import React from "react";

const Tickets = () => {
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
            Tickets
        </div>
    );
};

export default Tickets;
