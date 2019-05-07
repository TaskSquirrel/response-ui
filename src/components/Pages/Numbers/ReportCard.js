import React from "react";
import PropTypes from "prop-types";
import CardBase from "../../UI/CardBase";

import Badge from "../../UI/Badge";

import styles from "./ReportCard.module.scss";
import MetricLabel from "./MetricLabel";

const ReportCard = ({
    reportNumber,
    date,
    type,
    length
}) => {
    function toDate(millis) {
        const obj = new Date(millis);

        return obj.toLocaleDateString();
    }

    function renderBadge() {
        const color = type === "Outgoing"
            ? "sand"
            : "jungle";

        return (
            <Badge
                color={ color }
            >
                { type }
            </Badge>
        );
    }

    return (
        <CardBase
            active
        >
            <div
                className={ styles.inner }
            >
                <div
                    className={ styles.info }
                >
                    <div
                        className={ styles.date }
                    >
                        { toDate(date) }
                    </div>
                    <div
                        className={ styles.title }
                    >
                        { reportNumber }
                    </div>
                    <MetricLabel
                        value={ length }
                        unit="minutes"
                    />
                </div>
                <div>
                    { renderBadge() }
                </div>
            </div>
        </CardBase>
    );
};

ReportCard.propTypes = {
    reportNumber: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired
};

export default ReportCard;
