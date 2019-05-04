import React from "react";
import PropTypes from "prop-types";

import Progress from "./Progress";

import styles from "./Wizard.module.scss";

const WizardViewWrapper = ({
    children,
    percent,
    showProgress
}) => (
    <main
        className={ styles.container }
    >
        {
            showProgress && (
                <Progress
                    percent={ percent }
                />
            )
        }
        <div
            className={ styles.box }
        >
            { children }
        </div>
    </main>
);

WizardViewWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    percent: PropTypes.number.isRequired,
    showProgress: PropTypes.bool
};

WizardViewWrapper.defaultProps = {
    showProgress: true
};

export default WizardViewWrapper;
