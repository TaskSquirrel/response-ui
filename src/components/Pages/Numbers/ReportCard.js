import React from "react";
import PropTypes from "prop-types";
import CardBase from "../../UI/CardBase";

import Badge from "../../UI/Badge";
import MetricLabel from "./MetricLabel";

import styles from "./ReportCard.module.scss";

const ReportCard = ({
    reportNumber,
    date,
    type,
    length,
    startEmotion,
    endEmotion
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
            className={ styles.card }
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
                    <div
                        className={ styles.metrics }
                    >
                        <MetricLabel
                            value={ length }
                            unit="minutes"
                        />
                        <MetricLabel
                            value={ startEmotion }
                            unit="start anxiety"
                        />
                        <MetricLabel
                            value={ endEmotion }
                            unit="end anxiety"
                        />
                    </div>
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
    length: PropTypes.number.isRequired,
    startEmotion: PropTypes.number.isRequired,
    endEmotion: PropTypes.number.isRequired
};

export default ReportCard;
