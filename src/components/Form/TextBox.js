import React from "react";
import classNames from "classnames";

import TextControl from "./TextControl";

import styles from "./TextBox.module.scss";

const TextBox = ({
    className,
    ...rest
}) => (
    <TextControl
        className={ classNames(
            styles.textbox,
            className
        ) }
        { ...rest }
    />
);

TextBox.propTypes = {
    ...TextControl.propTypes
};

export default TextBox;
