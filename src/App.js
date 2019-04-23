import React from "react";
import { HashRouter } from "react-router-dom";

import Development from "./components/Development";
import PageRouter from "./components/PageRouter";

import "./App.module.scss";

const App = () => (
    <React.StrictMode>
        <HashRouter>
            <Development>
                <PageRouter />
            </Development>
        </HashRouter>
    </React.StrictMode>
);

export default App;
