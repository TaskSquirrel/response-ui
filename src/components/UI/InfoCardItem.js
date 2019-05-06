import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import styles from "./InfoCard.module.scss";

const InfoCardItem = ({
    title,
    value,
    unit
}) => (
    <li
        className={ styles.item }
    >
        <div
            className={ styles.title }
        >
            { title }
        </div>
        <div
            className={ styles.value }
        >
            <div
                className={ styles.stat }
            >
                { value }
            </div>
            <div
                className={ styles.unit }
            >
                { unit }
            </div>
        </div>
    </li>
);

InfoCardItem.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    unit: PropTypes.string.isRequired
};

export default InfoCardItem;
