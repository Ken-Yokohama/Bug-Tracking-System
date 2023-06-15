import { Box, Paper } from "@mui/material";
import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useSelector } from "react-redux";
import { TicketsModel } from "../tickets/interface";
import { formatTicketDistribution } from "../../utils/api";

const TickeDistribution = () => {
    const allTickets = useSelector(
        (state: { tickets: { value: [TicketsModel] } }) => state.tickets.value
    );

    const data = formatTicketDistribution(allTickets);

    return (
        <Paper
            sx={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                padding: "2rem",
                paddingBottom: "1rem",
                paddingRight: "0",
            }}
            elevation={3}
        >
            <h3
                style={{
                    color: "#005096",
                }}
            >
                Ticket Distribution
            </h3>
            <Box
                sx={{
                    height: "40vh",
                    maxWidth: "calc(100vw - 2rem)",
                    "@media(min-width: 700px)": {
                        maxWidth: "calc(100vw - 30rem)",
                    },
                }}
            >
                <ResponsiveLine
                    data={data}
                    margin={{ top: 20, right: 40, bottom: 40, left: 30 }}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: true,
                        reverse: false,
                    }}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 0,
                        // tickPadding: 5,
                        tickPadding: 10,
                        tickRotation: 0,
                        // legend: "Projects",
                        legendOffset: 36,
                        legendPosition: "middle",
                    }}
                    axisLeft={{
                        tickSize: 0,
                        // tickPadding: 5,
                        tickPadding: 10,
                        tickRotation: 0,
                        // legend: "Tickets",
                        legendOffset: -40,
                        legendPosition: "middle",
                    }}
                    enableGridY={false}
                    colors={[
                        "#FEE6CE",
                        // "#FDD0A2",
                        "#FDAE6B",
                        "#F0781E",
                    ]}
                    // colors={{ scheme: "oranges" }}
                    enablePoints={false}
                    pointSize={10}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    enableArea={true}
                    areaOpacity={1}
                    // areaOpacity={0.55}
                    enableSlices="x"
                    useMesh={true}
                    legends={[]}
                />
            </Box>
        </Paper>
    );
};

export default TickeDistribution;
