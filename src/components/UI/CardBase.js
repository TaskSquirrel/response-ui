import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import styles from "./CardBase.module.scss";

const CardBase = ({
    children,
    className,
    active
}) => (
    <div
        className={ classNames(
            styles.card,
            active && styles.active,
            className
        ) }
    >
        { children }
    </div>
);

CardBase.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    active: PropTypes.bool
};

CardBase.defaultProps = {
    className: null,
    active: false
};

export default CardBase;
