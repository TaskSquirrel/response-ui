import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import styles from "./Badge.module.scss";

const COLORS = {
    default: null,
    purple: styles.purple,
    sand: styles.sand,
    jungle: styles.jungle
};

const Badge = ({
    children,
    color
}) => (
    <span
        className={ classNames(
            styles.badge,
            COLORS[color]
        ) }
    >
        { children }
    </span>
);

Badge.propTypes = {
    children: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
        "default",
        "purple",
        "sand",
        "jungle"
    ])
};

Badge.defaultProps = {
    color: "default"
};

export default Badge;
