import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [{}],
};

const allProjectsSlice = createSlice({
    name: "allProjects",
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setProjects } = allProjectsSlice.actions;

export default allProjectsSlice.reducer;
