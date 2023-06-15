import { Box, TextField } from "@mui/material";
import React, { useState, SyntheticEvent } from "react";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllTickets } from "../../../service";
import { createTicket } from "../service";
import { setTickets } from "../../../features/ticketsSlice";
import { ProjectsModel } from "../../projects/interface";

const AddTicketModal = ({ open, setOpen }: any) => {
    const dispatch = useDispatch();

    const allProjects = useSelector(
        (state: { allProjects: { value: [ProjectsModel] } }) =>
            state.allProjects.value
    );

    // Project Options for AutoComplete
    const projectOptions = allProjects.map((project: any) => {
        return project.title;
    });

    // Add new Ticket
    const addNewTicket = async () => {
        // Validate All Fields
        if (
            !ticketTitle ||
            !ticketDescription ||
            !ticketProject ||
            !priority ||
            !type ||
            !estimatedTime
        ) {
            setNewTicketErr("Please Complete All Fields");
            return;
        } else {
            setNewTicketErr("");
        }
        setLoadingButton(true);
        try {
            const response = await createTicket({
                title: ticketTitle,
                description: ticketDescription,
                project: ticketProject,
                priority: priority,
                type: type,
                estimatedTime: estimatedTime,
            });
            console.log(response);
            setLoadingButton(false);
            getTickets();
            handleClose();
        } catch (err) {
            if (err instanceof Error) {
                setNewTicketErr(err.message);
                setLoadingButton(false);
            } else {
                setNewTicketErr(String(err));
                setLoadingButton(false);
            }
        }
    };

    const getTickets = async () => {
        const response = await getAllTickets();
        dispatch(setTickets(response));
    };

    const handleClose = () => {
        setOpen(false);
        setTicketProject("");
        setTicketTitle("");
        setTicketDescription("");
        setPriority("");
        setType("");
        setEstimatedTime(0);
        setNewTicketErr("");
    };

    // Options for Priority
    const priorityOptions = ["Low", "Medium", "High"];

    // Options for Type
    const typeOptions = ["Issue", "Bug Fix", "Feature Request"];

    // Options for Time
    const timeOptions = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
    ];

    // new Ticket States
    const [ticketProject, setTicketProject] = useState<string>("");
    const [ticketTitle, setTicketTitle] = useState<string>("");
    const [ticketDescription, setTicketDescription] = useState<string>("");
    const [priority, setPriority] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [estimatedTime, setEstimatedTime] = useState<number>(0);

    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    // Rename to newTicketErr
    const [newTicketErr, setNewTicketErr] = useState<String>("");

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h3 style={{ color: "#005096" }}>Create New Ticket:</h3>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        "@media (min-Width: 700px)": {
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                        },
                    }}
                >
                    <TextField
                        error={newTicketErr && !ticketTitle}
                        id="standard-basic"
                        label="Ticket Title"
                        variant="standard"
                        inputProps={{ maxLength: 20 }}
                        onChange={(e) => {
                            setTicketTitle(e.target.value);
                        }}
                    />
                    <TextField
                        error={newTicketErr && !ticketDescription}
                        id="standard-basic"
                        label="Ticket Description"
                        variant="standard"
                        multiline
                        onChange={(e) => {
                            setTicketDescription(e.target.value);
                        }}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        size="small"
                        options={projectOptions[0] ? projectOptions : []}
                        onChange={(e: SyntheticEvent, value: null | string) => {
                            if (value) {
                                setTicketProject(value);
                            }
                        }}
                        renderInput={(params: object) => (
                            <TextField
                                {...params}
                                label="Choose Project"
                                error={newTicketErr && !ticketProject}
                            />
                        )}
                    />
                    <Autocomplete
                        fullWidth
                        disablePortal
                        id="combo-box-demo"
                        options={priorityOptions}
                        size="small"
                        onChange={(
                            e: React.SyntheticEvent<Element, Event>,
                            value: string | null
                        ) => {
                            if (value) {
                                setPriority(value);
                            }
                        }}
                        renderInput={(params: object) => (
                            <TextField
                                {...params}
                                label="Choose Priority"
                                error={newTicketErr && !priority}
                            />
                        )}
                    />
                    <Autocomplete
                        fullWidth
                        disablePortal
                        id="combo-box-demo"
                        options={typeOptions}
                        size="small"
                        onChange={(e: any, value: any) => {
                            setType(value);
                        }}
                        renderInput={(params: any) => (
                            <TextField
                                {...params}
                                label="Type"
                                error={newTicketErr && !type}
                            />
                        )}
                    />
                    <Autocomplete
                        fullWidth
                        disablePortal
                        id="combo-box-demo"
                        options={timeOptions}
                        size="small"
                        onChange={(e: any, value: any) => {
                            setEstimatedTime(value);
                        }}
                        renderInput={(params: any) => (
                            <TextField
                                {...params}
                                label="Time Hrs"
                                error={newTicketErr && !estimatedTime}
                            />
                        )}
                    />
                </Box>

                <LoadingButton
                    variant="contained"
                    loading={loadingButton}
                    sx={{
                        marginTop: "0.5rem",
                        backgroundColor: "#005096",
                        ":hover": {
                            backgroundColor: "#01447D",
                        },
                        borderRadius: "0",
                        textTransform: "capitalize",
                        width: "100%",
                        "@media(min-width: 700px)": {
                            alignSelf: "flex-end",
                            marginTop: "1rem",
                            // width: "166px",
                            // width: "50%",
                            height: "50px",
                        },
                    }}
                    onClick={addNewTicket}
                >
                    Submit
                </LoadingButton>
                {newTicketErr && (
                    <FormHelperText error>{newTicketErr}</FormHelperText>
                )}
            </Box>
        </Modal>
    );
};

export default AddTicketModal;
