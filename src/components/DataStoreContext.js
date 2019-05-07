import React from "react";

const DataStoreContext = React.createContext({});

const withDataStore = Component => props => (
    <DataStoreContext.Consumer>
        { value => (
            <Component
                value={ value }
                { ...props }
            />
        ) }
    </DataStoreContext.Consumer>
);

export default DataStoreContext;
export {
    withDataStore
};
