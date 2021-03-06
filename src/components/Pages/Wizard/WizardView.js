import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import Loading from "../../Layout/Loading";
import Upload from "../../Form/Upload";
import Button from "../../Form/Button";
import ButtonBase from "../../Form/ButtonBase";

import styles from "./Wizard.module.scss";

const WizardView = ({
    loading,
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
                <ButtonBase
                    className={ classNames(
                        styles.prev,
                        !prevable && styles.hide
                    ) }
                    onClick={ prev }
                >
                    Previous
                </ButtonBase>
                <Button
                    disabled={ !enabled }
                    onClick={ next }
                >
                    Next
                </Button>
            </div>
        );
    }

    function renderTimeoutRedo() {
        const message = "It's taking a little bit longer than usual...";

        return (
            <div
                className={ styles.message }
            >
                { message }
            </div>
        );
    }

    if (loading) {
        return (
            <div
                className={ styles.loader }
            >
                <Loading
                    timeoutRender={ renderTimeoutRedo }
                />
            </div>
        );
    }

    return (
        <React.Fragment>
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
            { renderNavigationButtons(nextable && file) }
        </React.Fragment>
    );
};

WizardView.propTypes = {
    loading: PropTypes.bool.isRequired,
    step: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    file: PropTypes.instanceOf(File),
    prevable: PropTypes.bool.isRequired,
    nextable: PropTypes.bool.isRequired,
    upload: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired
};

WizardView.defaultProps = {
    file: null
};

export default WizardView;
