import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";

import styles from "./Loading.module.scss";

const Loading = ({
    timeout,
    timeoutRender
}) => {
    const [timedOut, setTimedOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setTimedOut(true), timeout);

        return () => {
            clearTimeout(timer);
        };
    });

    function renderTimeoutMessage() {
        if (!timeout) {
            return null;
        }

        return (
            <div
                className={ styles.timeout }
            >
                {
                    timedOut && timeoutRender()
                }
            </div>
        );
    }

    return (
        <div
            className={ styles.loading }
        >
            <div
                className={ styles.loader }
            >
                <Loader
                    type="ThreeDots"
                    color="#000000"
                />
            </div>
            { renderTimeoutMessage() }
        </div>
    );
};

Loading.propTypes = {
    timeout: PropTypes.number,
    timeoutRender: PropTypes.func
};

Loading.defaultProps = {
    timeout: 5000,
    timeoutRender: () => null
};

export default Loading;
