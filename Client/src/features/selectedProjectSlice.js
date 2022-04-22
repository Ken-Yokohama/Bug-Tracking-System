import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: "",
};

const selectedProjectSlice = createSlice({
    name: "selectedProject",
    initialState,
    reducers: {
        setSelectedProject: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setSelectedProject } = selectedProjectSlice.actions;

export default selectedProjectSlice.reducer;
