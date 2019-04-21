import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import ButtonBase from "./ButtonBase";

import styles from "./Button.module.scss";

const Button = ({
    className,
    ...rest
}) => (
    <ButtonBase
        className={ classNames(
            styles.button,
            className
        ) }
        { ...rest }
    />
);

Button.propTypes = ButtonBase.propTypes;

Button.defaultProps = ButtonBase.defaultProps;

export default Button;
