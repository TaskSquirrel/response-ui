import React from "react";
import PropTypes from "prop-types";

import Button from "../../Form/Button";

import styles from "./Landing.module.scss";

const Landing = ({
    start
}) => (
    <div
        className={ styles.landing }
    >
        <h1
            className={ styles.heading }
        >
            Call History Analysis
        </h1>
        <Button
            className={ styles.button }
            onClick={ start }
        >
            Start new analysis
        </Button>
    </div>
);

Landing.propTypes = {
    start: PropTypes.func.isRequired
};

export default Landing;
