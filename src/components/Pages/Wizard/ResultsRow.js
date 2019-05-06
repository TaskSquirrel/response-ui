import React from "react";
import PropTypes from "prop-types";

import styles from "./ResultsRow.module.scss";

const ResultsRow = ({
    fileName,
    size
}) => {
    function bytesToKilobytes(kb) {
        return Math.round(kb / 1000);
    }

    return (
        <div
            className={ styles.row }
        >
            <div
                className={ styles.filename }
            >
                { fileName }
            </div>
            <div
                className={ styles.size }
            >
                { `${bytesToKilobytes(size)} kb` }
            </div>
        </div>
    );
};

ResultsRow.propTypes = {
    fileName: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
};

export default ResultsRow;
