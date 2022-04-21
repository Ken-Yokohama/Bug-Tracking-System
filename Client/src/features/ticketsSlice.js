import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [{}],
};

const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        setTickets: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setTickets } = ticketsSlice.actions;

export default ticketsSlice.reducer;
