import { Box } from "@mui/material";
import React from "react";

const Administration = () => {
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
            Administration
        </div>
    );
};

export default Administration;
