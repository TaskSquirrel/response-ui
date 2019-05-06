import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./Results.module.scss";
import Button from "../../Form/Button";
import ButtonBase from "../../Form/ButtonBase";
import ResultsRow from "./ResultsRow";

/* eslint react/no-array-index-key:off */

const Results = ({
    files,
    done,
    prev
}) => (
    <div>
        <h1
            className={ styles.heading }
        >
            Your selected files
        </h1>
        <div>
            You can come back any time and select new files.
        </div>
        <div
            className={ styles.list }
        >
            {
                files.map(({
                    file: {
                        name,
                        size
                    }
                }, index) => (
                    <ResultsRow
                        key={ index }
                        fileName={ name }
                        size={ size }
                    />
                ))
            }
        </div>
        <div
            className={ styles.buttons }
        >
            <Link
                to="/"
            >
                <Button
                    className={ styles.start }
                    onClick={ done }
                >
                    Start analysis!
                </Button>
            </Link>
            <ButtonBase
                className={ styles.prev }
                onClick={ prev }
            >
                Go back
            </ButtonBase>
        </div>
    </div>
);

Results.propTypes = {
    files: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    done: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired
};

Results.defaultProps = {
};

export default Results;
