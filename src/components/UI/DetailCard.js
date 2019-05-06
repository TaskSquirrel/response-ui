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
    second,
    icon,
    iconClassName
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
                    className={ classNames(
                        styles.icon,
                        iconClassName
                    ) }
                >
                    { icon && icon() }
                </div>
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
    title: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    first: PropTypes.string,
    second: PropTypes.string,
    icon: PropTypes.func,
    iconClassName: PropTypes.string
};

DetailCard.defaultProps = {
    active: false,
    title: "Title",
    first: null,
    second: null,
    icon: null,
    iconClassName: null
};

export default DetailCard;
