import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

import ViewNumberView from "./ViewNumberView";
import Loading from "../../Layout/Loading";

import { getPhoneNumberData } from "../../../api";

const ViewNumber = ({ match }) => {
    const [data, setData] = useState(null);
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
            reports={ data }
        />
    );
};

ViewNumber.propTypes = {
    match: PropTypes.shape({}).isRequired
};

export default withRouter(ViewNumber);
