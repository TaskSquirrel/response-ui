import React, { useState } from "react";
import PropTypes from "prop-types";

import DataStoreContext from "./DataStoreContext";

const DataStore = ({ children }) => {
    const [data, setData] = useState({});

    function createContextPayload() {
        return {
            data,
            setData
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
