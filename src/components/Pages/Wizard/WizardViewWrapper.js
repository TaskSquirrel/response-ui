import React from "react";
import PropTypes from "prop-types";

import styles from "./Wizard.module.scss";

const WizardViewWrapper = ({ children }) => (
    <main
        className={ styles.container }
    >
        <div
            className={ styles.box }
        >
            { children }
        </div>
    </main>
);

WizardViewWrapper.propTypes = {
    children: PropTypes.node.isRequired
};

export default WizardViewWrapper;
