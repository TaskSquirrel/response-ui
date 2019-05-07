import React from "react";
import PropTypes from "prop-types";

import withSkeleton from "../../Layout/withSkeleton";
import MetricLabel from "./MetricLabel";
import ReportCard from "./ReportCard";
import TextBox from "../../Form/TextBox";
import Button from "../../Form/Button";

import noop from "../../../utils/noop";
import phoneNumberize from "../../../utils/phone";
import toEmotion from "../../../utils/emotion";

import styles from "./Numbers.module.scss";

const ViewNumberView = ({
    number,
    count,
    average,
    emotion,
    reports,
    stringFilter,
    setStringFilter,
    filter,
    setFilter
}) => {
    function round(n) {
        return Math.round(n * 100) / 100;
    }

    function createFilterChanger(filterType) {
        return () => {
            if (filterType === filter) {
                // Same filter, so disable it
                setFilter(null);
            } else {
                setFilter(filterType);
            }
        };
    }

    function renderReports() {
        if (!reports || reports.length < 1) {
            return "No reports found!";
        }

        return reports.map(({
            reportNumber,
            date,
            type,
            length,
            startEmotion,
            endEmotion
        }) => (
            <ReportCard
                key={ reportNumber }
                reportNumber={ reportNumber }
                date={ date }
                type={ type }
                length={ length }
                startEmotion={ startEmotion }
                endEmotion={ endEmotion }
            />
        ));
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
                        value={ toEmotion(startEmotion) }
                        unit="starting anxiety"
                    />
                    <MetricLabel
                        value={ toEmotion(endEmotion) }
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
                    { renderReports() }
                </div>
                <div
                    className={ styles.filters }
                >
                    <div>
                        <h3>
                            Filter by call report number
                        </h3>
                        <TextBox
                            className={ styles.textbox }
                            value={ stringFilter }
                            onChange={ ({ target: { value } }) => setStringFilter(value) }
                        />
                    </div>
                    <div>
                        <h3>
                            Filter by time
                        </h3>
                        <span>
                            { filter && `Filtering by ${filter}` }
                        </span>
                        <div>
                            <Button
                                onClick={ createFilterChanger("ONE_WEEK") }
                            >
                                One week
                            </Button>
                            <Button
                                onClick={ createFilterChanger("ONE_MONTH") }
                            >
                                One month
                            </Button>
                            <Button
                                onClick={ createFilterChanger("HALF_YEAR") }
                            >
                                Half a year
                            </Button>
                            <Button
                                onClick={ createFilterChanger("ONE_YEAR") }
                            >
                                One year
                            </Button>
                        </div>
                    </div>
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
    reports: PropTypes.arrayOf(PropTypes.shape({})),
    stringFilter: PropTypes.string,
    setStringFilter: PropTypes.func,
    filter: PropTypes.string,
    setFilter: PropTypes.func
};

ViewNumberView.defaultProps = {
    count: 0,
    average: 0,
    reports: [],
    stringFilter: "",
    setStringFilter: noop,
    filter: null,
    setFilter: noop
};

export default withSkeleton(ViewNumberView);
