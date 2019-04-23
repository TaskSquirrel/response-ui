import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const IS_DEV = process.env.NODE_ENV !== "production";

const links = [
    {
        to: "/",
        title: "Home"
    },
    {
        to: "/wizard",
        title: "Wizard"
    }
];

const Development = ({ children }) => {
    function renderDevelopmentWrapper() {
        return (
            <React.Fragment>
                { children }
                <div>
                    { links.map(({ to, title }) => (
                        <Link
                            key={ to }
                            to={ to }
                        >
                            { title }
                        </Link>
                    )) }
                </div>
            </React.Fragment>
        );
    }

    return IS_DEV
        ? renderDevelopmentWrapper()
        : children;
};

Development.propTypes = {
    children: PropTypes.node.isRequired
};

export default Development;
