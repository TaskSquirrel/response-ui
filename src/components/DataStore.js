import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import DataStoreContext from "./DataStoreContext";

import electron from "../utils/electron";

const DataStore = ({ children }) => {
    const [data, setData] = useState({});
    const [uploaded, setUploaded] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        electron.ipcRenderer.on("online-check-reply", (_, {
            client,
            ready
        }) => {
            if (client) {
                setUploaded(true);
            }

            if (ready) {
                setLoaded(true);
            }
        });

        electron.ipcRenderer.once("upload-done", () => {
            setLoaded(true);
        });

        electron.ipcRenderer.send("online-check");
    });

    function createContextPayload() {
        return {
            data,
            uploaded,
            loaded,
            setData,
            setUploaded,
            setLoaded
        };
    }

    return (
        <DataStoreContext.Provider
            value={ createContextPayload() }
        >
            { children }
        </DataStoreContext.Provider>
    );
};

DataStore.propTypes = {
    children: PropTypes.node.isRequired
};

export default DataStore;
