import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import allProjectsReducer from "./features/allProjectsSlice";
import ticketsReducer from "./features/ticketsSlice";
import selectedProjectReducer from "./features/selectedProjectSlice";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const store = configureStore({
    reducer: {
        allProjects: allProjectsReducer,
        tickets: ticketsReducer,
        selectedProject: selectedProjectReducer,
    },
    //Place Reducers Here ^^
});

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router basename="/Bug-Tracking-System">
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
);
