import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

import ViewNumberView from "./ViewNumberView";
import Loading from "../../Layout/Loading";

import { getPhoneNumberData } from "../../../api";

const TIME_FILTERS = {
    ONE_WEEK: 604800000,
    ONE_MONTH: 2629746000,
    HALF_YEAR: 15778476000,
    ONE_YEAR: 31556952000
};

const ViewNumber = ({ match }) => {
    const [data, setData] = useState(null);
    const [startsWith, setStartsWith] = useState("");
    const [filter, setFilter] = useState(null);

    const number = match.params.num;

    useEffect(() => {
        if (data === null) {
            getPhoneNumberData(number)
                .then(numberData => setData(numberData));
        }
    });

    function calculateAverageCallLength() {
        return data.reduce((accumulator, { length }) => accumulator + length, 0) / data.length;
    }

    function filterByTime(entries, timeFilter) {
        const millis = TIME_FILTERS[timeFilter];

        return entries.filter(({
            timeSince = 0
        }) => timeSince <= millis);
    }

    function filterData() {
        let filtered = data;

        if (startsWith) {
            filtered = filtered.filter(({ reportNumber: n }) => `${n}`.startsWith(startsWith));
        }

        if (filter) {
            filtered = filterByTime(filtered, filter);
        }

        return filtered;
    }

    function getEmotionData() {
        const first = data[0];
        const last = data[data.length - 1];

        return {
            started: first.averageEmotion,
            ended: last.averageEmotion
        };
    }

    if (!data) {
        return (
            <Loading
                timeout={ 6000 }
                timeoutRender={ () => (
                    <div>
                        <div>
                            Oops. Something went wrong!
                        </div>
                        <Link
                            to="/"
                        >
                            Go back
                        </Link>
                    </div>
                ) }
            />
        );
    }

    return (
        <ViewNumberView
            number={ number }
            count={ data.length }
            average={ calculateAverageCallLength() }
            emotion={ getEmotionData() }
            reports={ filterData() }
            stringFilter={ startsWith }
            setStringFilter={ setStartsWith }
            filter={ filter }
            setFilter={ setFilter }
        />
    );
};

ViewNumber.propTypes = {
    match: PropTypes.shape({}).isRequired
};

export default withRouter(ViewNumber);
