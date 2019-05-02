import React from "react";
import { HashRouter } from "react-router-dom";

import DataStore from "./components/DataStore";
import Development from "./components/Development";
import PageRouter from "./components/PageRouter";

import "./App.module.scss";

const App = () => (
    <React.StrictMode>
        <HashRouter>
            <DataStore>
                <Development>
                    <PageRouter />
                </Development>
            </DataStore>
        </HashRouter>
    </React.StrictMode>
);

export default App;
