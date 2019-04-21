import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import styles from "./TextControl.module.scss";

const TextBox = ({
    className,
    ...rest
}) => (
    <input
        type="text"
        className={ classNames(
            styles.textbox,
            className
        ) }
        { ...rest }
    />
);

TextBox.propTypes = {
    className: PropTypes.string
};

TextBox.defaultProps = {
    className: null
};

export default TextBox;
