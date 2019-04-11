import React from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

const Router = ({
    routes,
    pathPrefix
}) => {
    /* eslint-disable react/prop-types */
    function createRoute({
        path,
        component: Component,
        render,
        ...pass
    }) {
        const renderThis = Component
            ? <Component />
            : render();

        const appendPath = pathPrefix
            ? `${pathPrefix}${path}`
            : path;

        return (
            <Route
                { ...pass }
                path={ appendPath }
                render={ renderThis }
            />
        );
    }

    /* eslint-enable react/prop-types */

    return (
        <Switch>
            { routes.map(createRoute) }
        </Switch>
    );
};

Router.propTypes = {
    pathPrefix: PropTypes.string,
    routes: PropTypes
        .arrayOf(PropTypes.shape({}))
        .isRequired
};

Router.defaultProps = {
    pathPrefix: null
};

export default Router;
