import React from "react";
import PropTypes from "prop-types";

import withSkeleton from "../../Layout/withSkeleton";
import MetricLabel from "./MetricLabel";

import phoneNumberize from "../../../utils/phone";

import styles from "./Numbers.module.scss";
import ReportCard from "./ReportCard";

const ViewNumberView = ({
    number,
    count,
    average,
    reports
}) => {
    function round(n) {
        return Math.round(n * 100) / 100;
    }

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
    reports: PropTypes.arrayOf(PropTypes.shape({}))
};

ViewNumberView.defaultProps = {
    count: 0,
    average: 0,
    reports: []
};

export default withSkeleton(ViewNumberView);
