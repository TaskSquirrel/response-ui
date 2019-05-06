import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import CardBase from "./CardBase";
import RightArrow from "../SVG/RightArrow";

import styles from "./DetailCard.module.scss";

const DetailCard = ({
    active,
    title,
    first,
    second
}) => {
    function renderArrow() {
        if (!active) {
            return null;
        }

        return (
            <RightArrow
                className={ styles.right }
            />
        );
    }

    return (
        <CardBase
            className={ classNames(
                styles.card,
                active && styles.active
            ) }
        >
            <div
                className={ styles.inner }
            >
                <div
                    className={ styles.icon }
                />
                <div
                    className={ styles.info }
                >
                    <div
                        className={ styles.title }
                    >
                        { title }
                    </div>
                    <div
                        className={ styles.first }
                    >
                        { first }
                    </div>
                    <div
                        className={ styles.second }
                    >
                        { second }
                    </div>
                </div>
                { renderArrow() }
            </div>
        </CardBase>
    );
};

DetailCard.propTypes = {
    active: PropTypes.bool,
    title: PropTypes.string,
    first: PropTypes.string,
    second: PropTypes.string
};

DetailCard.defaultProps = {
    active: false,
    title: "Title",
    first: "Detail 1",
    second: "Detail 2"
};

export default DetailCard;
