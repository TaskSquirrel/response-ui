import React from "react";
import PropTypes from "prop-types";

import styles from "./Progress.module.scss";

const Progress = ({
    percent
}) => (
    <div
        className={ styles.progress }
    >
        <div
            className={ styles.filler }
            style={ {
                transform: `translateX(-${(100 - percent * 100)}%)`
            } }
        />
    </div>
);

Progress.propTypes = {
    percent: PropTypes.number.isRequired
};

export default Progress;
