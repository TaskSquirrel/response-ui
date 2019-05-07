import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
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

    if (!data) {
        return (
            <Loading />
        );
    }

    console.log(data);

    return (
        <ViewNumberView
            number={ number }
            count={ data.length }
            average={ calculateAverageCallLength() }
            reports={ data }
        />
    );
};

ViewNumber.propTypes = {
    match: PropTypes.shape({}).isRequired
};

export default withRouter(ViewNumber);
