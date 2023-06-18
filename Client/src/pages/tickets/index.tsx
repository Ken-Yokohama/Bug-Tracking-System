/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, InputAdornment, Paper, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setTickets } from "../../features/ticketsSlice";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { getAllTickets } from "../../service";
import { addComment, addDevs, updateStatus } from "./service";
import PestControlIcon from "@mui/icons-material/PestControl";
import ConstructionIcon from "@mui/icons-material/Construction";
import HardwareIcon from "@mui/icons-material/Hardware";
import TicketTable from "./tickets-table";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AddTicketModal from "./tickets-table/add-ticket-modal";

const Tickets = () => {
    const [cookies, setCookie, removeCookie] = useCookies<any>(["user"]);

    const dispatch = useDispatch();

    const getTickets = async () => {
        const response = await getAllTickets();
        dispatch(setTickets(response));
    };

    // Selected Ticket Object
    const [selectedFilteredTicket, setSelectedFilteredTicket] = useState<any>(
        {}
    );

    const handleChangeStatus = async (e: { target: { value: string } }) => {
        const response = await updateStatus({
            id: selectedFilteredTicket?._id,
            status: e.target.value,
        });
        // Update Ticket Obj State
        const updatedStatusObj = {
            ...selectedFilteredTicket,
            status: e.target.value,
        };
        setSelectedFilteredTicket(updatedStatusObj);

        getTickets();

        // console.log(response);
    };

    const [newDev, setNewDev] = useState<string>("");

    const addNewDev = async () => {
        if (selectedFilteredTicket?.assignedDevs?.includes(newDev)) return;
        if (!selectedFilteredTicket._id) return;

        const response = await addDevs({
            id: selectedFilteredTicket?._id,
            newDev: newDev,
        });

        await getTickets();

        // Update Ticket Obj State
        setSelectedFilteredTicket((prevValue: any) => ({
            ...prevValue,
            assignedDevs: [...prevValue?.assignedDevs, newDev],
        }));

        setNewDev("");

        // console.log(response);
    };

    const [newComment, setNewComment] = useState<string>("");

    const addNewComment = async () => {
        if (!selectedFilteredTicket._id) return;
        console.log(selectedFilteredTicket?.comments);

        const response = await addComment({
            id: selectedFilteredTicket?._id,
            comment: newComment,
        });
        // Update Ticket Obj State
        const updatedStatusObj = {
            ...selectedFilteredTicket,
            comments: [
                ...selectedFilteredTicket?.comments,
                { author: cookies.Email, comment: newComment },
            ],
        };

        setSelectedFilteredTicket(updatedStatusObj);
        setNewComment("");
        getTickets();

        // console.log(response);
    };

    const [showFullDescription, setShowFullDescription] =
        useState<boolean>(false);
    const renderDescription = () => {
        if (
            selectedFilteredTicket?.description.length > 45 &&
            !showFullDescription
        ) {
            return (
                <>
                    {selectedFilteredTicket?.description.substring(0, 30)}...
                    <span
                        onClick={() => {
                            setShowFullDescription(true);
                        }}
                        style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                        }}
                    >
                        See More
                    </span>
                </>
            );
        } else {
            return selectedFilteredTicket?.description;
        }
    };

    // Modal Controllers
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Box
                sx={{
                    "@media(min-width: 700px)": {
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                    },
                }}
            >
                <Box
                    sx={{
                        height: "6rem",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 1rem",
                        justifyContent: "space-between",
                        "@media(max-width: 700px)": {
                            height: "5rem",
                        },
                    }}
                >
                    <h2
                        style={{
                            color: "#005096",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <ConfirmationNumberIcon sx={{ marginRight: "1rem" }} />
                        My Tickets
                    </h2>
                    <Button
                        variant="contained"
                        sx={{
                            marginTop: "0.5rem",
                            backgroundColor: "#005096",
                            ":hover": {
                                backgroundColor: "#01447D",
                            },
                            borderRadius: "0",
                            textTransform: "capitalize",
                        }}
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        + Add Ticket
                    </Button>
                </Box>
                <TicketTable
                    setSelectedFilteredTicket={setSelectedFilteredTicket}
                    setShowFullDescription={setShowFullDescription}
                />
                {/* Ticket Info and Comments Container */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "1rem",
                        gap: "1rem",
                        "@media(min-width: 700px)": {
                            flexDirection: "row",
                            display: "flex",
                            flex: "1",
                        },
                    }}
                >
                    <Paper
                        sx={{
                            flex: "1",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        elevation={3}
                    >
                        <Box
                            sx={{
                                padding: "1rem",
                                backgroundColor: "#F0781E",
                                color: "white",
                            }}
                        >
                            <h3>
                                Ticket Info
                                {selectedFilteredTicket?.title &&
                                    ` -  "${selectedFilteredTicket?.title}"`}
                            </h3>
                        </Box>
                        {selectedFilteredTicket?.title && (
                            <Box
                                sx={{
                                    flex: "1",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                    padding: "1rem",
                                }}
                            >
                                <Box
                                    sx={{
                                        flex: "1",
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr 1fr",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <Box>
                                        <p>Priority</p>
                                        <TextField
                                            disabled={true}
                                            sx={{
                                                "& input:disabled": {
                                                    height: "1rem",
                                                    // backgroundColor: "#edeceb",
                                                    WebkitTextFillColor:
                                                        selectedFilteredTicket?.priority ===
                                                        "Low"
                                                            ? "Green"
                                                            : selectedFilteredTicket?.priority ===
                                                              "Medium"
                                                            ? "Orange"
                                                            : "Red",
                                                    borderRadius: "4px",
                                                    fontWeight: "bold",
                                                },
                                            }}
                                            size={"small"}
                                            value={
                                                selectedFilteredTicket?.priority
                                            }
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        <p>Author</p>
                                        <TextField
                                            disabled={true}
                                            sx={{
                                                "& input:disabled": {
                                                    height: "1rem",
                                                    // backgroundColor: "#edeceb",
                                                    WebkitTextFillColor: "grey",
                                                    borderRadius: "4px",
                                                },
                                            }}
                                            size={"small"}
                                            value={
                                                selectedFilteredTicket?.ticketAuthor
                                            }
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        <p>Description</p>
                                        {renderDescription()}
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        flex: "1",
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr 1fr",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <Box>
                                        <p>Type</p>
                                        <TextField
                                            disabled={true}
                                            sx={{
                                                "& input:disabled": {
                                                    height: "1rem",
                                                    // backgroundColor: "#edeceb",
                                                    WebkitTextFillColor: "grey",
                                                    borderRadius: "4px",
                                                },
                                            }}
                                            size={"small"}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        {selectedFilteredTicket?.type ===
                                                        "Issue" ? (
                                                            <ConstructionIcon />
                                                        ) : selectedFilteredTicket?.type ===
                                                          "Bug Fix" ? (
                                                            <PestControlIcon />
                                                        ) : (
                                                            <HardwareIcon fontSize="small" />
                                                            // <></>
                                                        )}
                                                    </InputAdornment>
                                                ),
                                            }}
                                            value={selectedFilteredTicket?.type}
                                        />
                                    </Box>
                                    <Box>
                                        <p>Time (hrs)</p>
                                        <TextField
                                            disabled={true}
                                            sx={{
                                                "& input:disabled": {
                                                    height: "1rem",
                                                    // backgroundColor: "#edeceb",
                                                    WebkitTextFillColor: "grey",
                                                    borderRadius: "4px",
                                                },
                                            }}
                                            size={"small"}
                                            value={
                                                selectedFilteredTicket?.estimatedTime
                                            }
                                        />
                                    </Box>
                                    <Box>
                                        <p>Status</p>
                                        <Select
                                            sx={{
                                                width: "100%",
                                                height: "2rem",
                                            }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={
                                                selectedFilteredTicket?.status ||
                                                ""
                                            }
                                            label="Age"
                                            size="small"
                                            onChange={handleChangeStatus}
                                        >
                                            <MenuItem value="new">new</MenuItem>
                                            <MenuItem value={"in progress"}>
                                                in progress
                                            </MenuItem>
                                            <MenuItem value={"resolved"}>
                                                resolved
                                            </MenuItem>
                                        </Select>
                                        {/* {selectedFilteredTicket?.status} */}
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        flex: "1",
                                        "@media(min-width: 700px)": {
                                            flex: "1 1 0",
                                            overflowY: "scroll",
                                        },
                                    }}
                                >
                                    <Box sx={{ display: "flex", gap: "1rem" }}>
                                        <p>Assigned Devs:</p>
                                        <Box sx={{ display: "flex" }}>
                                            <input
                                                value={newDev}
                                                type="text"
                                                placeholder="Add Dev"
                                                style={{ width: "100%" }}
                                                onChange={(e) => {
                                                    setNewDev(e.target.value);
                                                }}
                                            />
                                            <button onClick={addNewDev}>
                                                Add
                                            </button>
                                        </Box>
                                    </Box>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "1rem",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        {selectedFilteredTicket?.assignedDevs?.map(
                                            (devs: string, index: number) => (
                                                <p key={index}>{devs}</p>
                                            )
                                        )}
                                    </div>
                                </Box>
                            </Box>
                        )}
                    </Paper>
                    <Paper
                        sx={{
                            flex: "1",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        elevation={3}
                    >
                        <Box
                            sx={{
                                padding: "1rem",
                                backgroundColor: "#E8AA42",
                                color: "white",
                            }}
                        >
                            <h3>Comments</h3>
                        </Box>
                        {selectedFilteredTicket?.title && (
                            <Box
                                sx={{
                                    flex: "1 1 1px",
                                    overflowY: "scroll",
                                    "@media(max-width: 700px)": {
                                        flex: "1 1 300px",
                                    },
                                }}
                            >
                                <Box sx={{ display: "flex", padding: "1rem" }}>
                                    <form
                                        style={{ width: "100%" }}
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            addNewComment();
                                        }}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Add Comment"
                                            style={{ width: "100%" }}
                                            value={newComment}
                                            onChange={(e) => {
                                                setNewComment(e.target.value);
                                            }}
                                        />
                                    </form>
                                    <button onClick={addNewComment}>
                                        Post
                                    </button>
                                </Box>
                                {selectedFilteredTicket?.comments
                                    ?.slice(0)
                                    ?.reverse()
                                    ?.map(
                                        (
                                            comment: {
                                                author: string;
                                                comment: string;
                                            },
                                            index: number
                                        ) => (
                                            <Box key={index} sx={{ p: "1rem" }}>
                                                <p>
                                                    {comment.author} -{" "}
                                                    {comment.comment}
                                                </p>
                                            </Box>
                                        )
                                    )}
                            </Box>
                        )}
                    </Paper>
                </Box>
            </Box>
            <AddTicketModal open={open} setOpen={setOpen} />
        </>
    );
};

export default Tickets;
