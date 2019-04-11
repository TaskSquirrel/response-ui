import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const Router = ({
    routes,
    pathPrefix,
    redirectTo,
    defaultRender
}) => {
    /* eslint-disable react/prop-types */
    function createRoute({
        path,
        component: Component,
        render,
        ...pass
    }) {
        const renderThis = Component
            ? () => <Component />
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

    function createDefaultFallback() {
        // If the `defaultRender` prop is provided,
        // use that. Otherwise, try using the `redirectTo` link.

        if (defaultRender) {
            return (
                <Route
                    render={ defaultRender }
                />
            );
        }

        return redirectTo
            ? (
                <Redirect
                    to={ redirectTo }
                />
            )
            : null;
    }

    /* eslint-enable react/prop-types */

    return (
        <Switch>
            { routes.map(createRoute) }
            { createDefaultFallback() }
        </Switch>
    );
};

Router.propTypes = {
    pathPrefix: PropTypes.string,
    routes: PropTypes
        .arrayOf(PropTypes.shape({}))
        .isRequired,

    redirectTo: PropTypes.string,
    defaultRender: PropTypes.func
};

Router.defaultProps = {
    pathPrefix: null,
    redirectTo: null,
    defaultRender: null
};

export default Router;
