import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

import CardBase from "./CardBase";

import styles from "./ActionCard.module.scss";

const ActionCard = ({
    className,
    title,
    subtitle,
    link
}) => {
    function renderCard() {
        return (
            <CardBase
                active={ !!link }
                className={ classNames(
                    styles.card,
                    className
                ) }
            >
                <div
                    className={ styles.inner }
                >
                    <div
                        className={ styles.title }
                    >
                        { title }
                    </div>
                    {
                        subtitle && (
                            <div
                                className={ styles.subtitle }
                            >
                                { subtitle }
                            </div>
                        )
                    }
                </div>
            </CardBase>
        );
    }

    return link
        ? (
            <Link
                to={ link }
            >
                { renderCard() }
            </Link>
        )
        : renderCard();
};

ActionCard.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    link: PropTypes.string
};

ActionCard.defaultProps = {
    className: null,
    subtitle: "",
    link: null
};

export default ActionCard;
