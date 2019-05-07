import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { withDataStore } from "../../DataStoreContext";
import ButtonBase from "../../Form/ButtonBase";
import Button from "../../Form/Button";

import styles from "./Landing.module.scss";

const Landing = ({
    start,
    value
}) => {
    const { loaded } = value;

    return (
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
            {
                loaded && (
                    <Link
                        to="/"
                    >
                        <ButtonBase
                            className={ styles.back }
                        >
                            Back to analysis
                        </ButtonBase>
                    </Link>
                )
            }
        </div>
    );
};

Landing.propTypes = {
    start: PropTypes.func.isRequired,
    value: PropTypes.shape({}).isRequired
};

export default withDataStore(Landing);
