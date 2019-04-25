import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import ButtonBase from "./ButtonBase";

import styles from "./Button.module.scss";

const Button = ({
    className,
    inverted,
    theme,
    ...rest
}) => (
    <ButtonBase
        className={ classNames(
            styles.button,
            theme !== "default" && Button.Themes[theme],
            inverted && styles.inverted,
            className
        ) }
        { ...rest }
    />
);

Button.Themes = {
    default: null,
    gray: styles.gray
};

Button.propTypes = {
    ...ButtonBase.propTypes,
    inverted: PropTypes.bool,
    theme: PropTypes.oneOf(Object.keys(Button.Themes))
};

Button.defaultProps = {
    ...ButtonBase.defaultProps,
    inverted: false,
    theme: "default"
};

export default Button;
