import React from "react";
import PropTypes from "prop-types";

import Upload from "../../Form/Upload";
import Button from "../../Form/Button";

import styles from "./Wizard.module.scss";

const WizardView = ({
    step,
    title,
    subtitle,
    file,
    prevable,
    nextable,
    upload,
    prev,
    next
}) => {
    function renderNavigationButtons(enabled) {
        return (
            <div
                className={ styles.navigator }
            >
                <Button
                    inverted
                    theme="gray"
                    className={
                        !prevable && styles.hide
                    }
                    onClick={ prev }
                >
                    Previous
                </Button>
                <Button
                    disabled={ !file }
                    onClick={ next }
                >
                    Next
                </Button>
            </div>
        );
    }

    return (
        <main
            className={ styles.container }
        >
            <div
                className={ styles.box }
            >
                <div
                    className={ styles["heading-container"] }
                >
                    <div
                        className={ styles.circle }
                    >
                        <h1
                            className={ styles.heading }
                        >
                            { step }
                        </h1>
                    </div>
                    <div
                        className={ styles.title }
                    >
                        <h2
                            className={ styles["title-text"] }
                        >
                            { title }
                        </h2>
                        <p
                            className={ styles["title-subtitle"] }
                        >
                            { subtitle }
                        </p>
                    </div>
                </div>
                <Upload
                    file={ file }
                    onUpload={ upload }
                />
                { renderNavigationButtons(file) }
            </div>
        </main>
    );
};

WizardView.propTypes = {
    step: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    file: PropTypes.instanceOf(File).isRequired,
    prevable: PropTypes.bool.isRequired,
    nextable: PropTypes.bool.isRequired,
    upload: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired
};

export default WizardView;
