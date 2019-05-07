import React from "react";
import PropTypes from "prop-types";

import withSkeleton from "../../Layout/withSkeleton";
import MetricLabel from "./MetricLabel";
import ReportCard from "./ReportCard";

import phoneNumberize from "../../../utils/phone";

import styles from "./Numbers.module.scss";

const ViewNumberView = ({
    number,
    count,
    average,
    emotion,
    reports
}) => {
    function round(n) {
        return Math.round(n * 100) / 100;
    }

    const startEmotion = emotion.started;
    const endEmotion = emotion.ended;

    return (
        <React.Fragment>
            <div
                className={ styles.heading }
            >
                <h1>
                    { phoneNumberize(`${number}`) }
                </h1>
                <div
                    className={ styles.metrics }
                >
                    <MetricLabel
                        value={ count }
                        unit="total calls"
                    />
                    <MetricLabel
                        value={ round(average) }
                        unit="min. average call time"
                    />
                    <MetricLabel
                        value={ startEmotion || "N/A" }
                        unit="starting anxiety"
                    />
                    <MetricLabel
                        value={ endEmotion || "N/A" }
                        unit="ending anxiety"
                    />
                </div>
            </div>
            <div
                className={ styles.container }
            >
                <div
                    className={ styles.results }
                >
                    {
                        reports.map(({
                            reportNumber,
                            date,
                            type,
                            length
                        }) => (
                            <ReportCard
                                key={ reportNumber }
                                reportNumber={ reportNumber }
                                date={ date }
                                type={ type }
                                length={ length }
                            />
                        ))
                    }
                </div>
                <div>
                    Filters
                </div>
            </div>
        </React.Fragment>
    );
};

ViewNumberView.propTypes = {
    number: PropTypes.string.isRequired,
    count: PropTypes.number,
    average: PropTypes.number,
    emotion: PropTypes.shape({}).isRequired,
    reports: PropTypes.arrayOf(PropTypes.shape({}))
};

ViewNumberView.defaultProps = {
    count: 0,
    average: 0,
    reports: []
};

export default withSkeleton(ViewNumberView);
