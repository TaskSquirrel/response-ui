import React from "react";
import PropTypes from "prop-types";

import CardBase from "./CardBase";
import InfoCardItem from "./InfoCardItem";

import styles from "./InfoCard.module.scss";

const InfoCard = ({
    className,
    items
}) => (
    <CardBase
        className={ className }
    >
        <ul
            className={ styles.inner }
        >
            {
                items.map(({
                    title,
                    value,
                    unit
                }) => (
                    <InfoCardItem
                        title={ title }
                        value={ value }
                        unit={ unit }
                    />
                ))
            }
        </ul>
    </CardBase>
);

InfoCard.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape(
        InfoCardItem.propTypes
    ))
};

InfoCard.defaultProps = {
    className: null,
    items: []
};

export default InfoCard;
