import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import styles from "./ButtonBase.module.scss";

/* eslint react/button-has-type:off */

const ButtonBase = ({
    type,
    className,
    ...rest
}) => (
    <button
        type={ type }
        className={ classNames(
            styles.button,
            className
        ) }
        { ...rest }
    />
);

ButtonBase.propTypes = {
    type: PropTypes.oneOf([
        "button",
        "reset",
        "submit"
    ]),
    className: PropTypes.string
};

ButtonBase.defaultProps = {
    type: "button",
    className: null
};

export default ButtonBase;
