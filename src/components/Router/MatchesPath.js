import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

const MatchesPath = ({
    children,
    path,
    exact,
    strict,
    location
}) => (
    <Route
        path={ path }
        exact={ exact }
        strict={ strict }
        location={ location }
    >
        { ({ match }) => {
            const matches = !!match;

            return children(matches);
        } }
    </Route>
);

MatchesPath.propTypes = {
    children: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    location: PropTypes.shape({})
};

MatchesPath.defaultProps = {
    exact: false,
    strict: false,
    location: null
};

export default MatchesPath;
