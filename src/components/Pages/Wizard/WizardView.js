import React from "react";
import Loader from "react-loader-spinner";
import classNames from "classnames";
import PropTypes from "prop-types";

import Progress from "./Progress";
import Upload from "../../Form/Upload";
import Button from "../../Form/Button";
import ButtonBase from "../../Form/ButtonBase";

import styles from "./Wizard.module.scss";

const { ipcRenderer } = window.require("electron");

const WizardView = ({
    loading,
    step,
    percentage,
    title,
    subtitle,
    file,
    prevable,
    nextable,
    upload,
    prev,
    next,
    done
}) => {
    function nextAction() {
        if (!nextable) {
            done();
        } else {
            next();
        }
    }

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
                    onClick={ nextAction }
                >
                    {
                        nextable
                            ? "Next"
                            : "Start analysis"
                    }
                </Button>
            </div>
        );
    }

    function meow() {
        ipcRenderer.send("echo");
    }

    if (loading) {
        return (
            <div
                className={ styles.loader }
            >
                <Loader
                    type="ThreeDots"
                    color="#000000"
                />
            </div>
        );
    }

    return (
        <React.Fragment>
            <Progress
                percent={ percentage }
            />
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
            <div>
                <button type="button" onClick={ meow }>
                    Connect to server.py!
                </button>
            </div>
            <Upload
                file={ file }
                onUpload={ upload }
            />
            { renderNavigationButtons(file) }
        </React.Fragment>
    );
};

WizardView.propTypes = {
    loading: PropTypes.bool.isRequired,
    step: PropTypes.number.isRequired,
    percentage: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    file: PropTypes.instanceOf(File),
    prevable: PropTypes.bool.isRequired,
    nextable: PropTypes.bool.isRequired,
    upload: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    done: PropTypes.func.isRequired
};

WizardView.defaultProps = {
    file: null
};

export default WizardView;
