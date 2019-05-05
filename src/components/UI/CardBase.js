import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import styles from "./CardBase.module.scss";

const CardBase = ({
    children,
    className
}) => (
    <div
        className={ classNames(
            styles.card,
            className
        ) }
    >
        { children }
    </div>
);

CardBase.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

CardBase.defaultProps = {
    className: null
};

export default CardBase;
