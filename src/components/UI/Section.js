import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import styles from "./Section.module.scss";

const HEADING_SIZES = {
    small: "h3",
    medium: "h2",
    large: "h1"
};

const Section = ({
    children,
    component,
    heading,
    headingSize,
    className,
    headingClassName,
    contentClassName
}) => React.createElement(
    component,
    { className },
    [
        React.createElement(
            HEADING_SIZES[headingSize],
            {
                className: classNames(
                    styles.heading,
                    headingClassName
                )
            },
            heading
        ),
        <div
            className={ classNames(
                styles.content,
                contentClassName
            ) }
        >
            { children }
        </div>
    ]
);

Section.HEADING_SIZES = HEADING_SIZES;

Section.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ]),
    headingClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    heading: PropTypes.string,
    headingSize: PropTypes.oneOf([
        "small",
        "medium",
        "large"
    ])
};

Section.defaultProps = {
    className: null,
    component: "section",
    headingClassName: null,
    contentClassName: null,
    heading: "",
    headingSize: "large"
};

export default Section;
