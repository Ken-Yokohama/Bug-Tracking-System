import React from "react";
import { Route, Routes } from "react-router-dom";
import { Main } from "./containers";
import { Login } from "./pages";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/*" element={<Main />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
