import React from "react";
import PropTypes from "prop-types";

import styles from "./MetricLabel.module.scss";

const MetricLabel = ({
    value,
    unit
}) => (
    <span>
        <span
            className={ styles.value }
        >
            { value }
        </span>
        <span
            className={ styles.unit }
        >
            { unit }
        </span>
    </span>
);

MetricLabel.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    unit: PropTypes.string.isRequired
};

export default MetricLabel;
