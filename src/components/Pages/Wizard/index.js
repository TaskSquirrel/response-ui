import React, { useState } from "react";
import PropTypes from "prop-types";

import { withDataStore } from "../../DataStoreContext";
import Landing from "./Landing";
import WizardViewWrapper from "./WizardViewWrapper";
import WizardView from "./WizardView";
import Results from "./Results";

import wizardSlides from "./wizard";

import electron from "../../../utils/electron";

const Wizard = ({ value }) => {
    const [started, setStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [files, setFiles] = useState([]);

    const prevable = step > 0;
    const nextable = step < wizardSlides.length;
    const reachedEnd = step === wizardSlides.length;

    function calculatePercentage() {
        return step / wizardSlides.length;
    }

    function prev() {
        if (!prevable) {
            return;
        }

        setStep(step - 1);
    }

    function next() {
        if (!nextable) {
            return;
        }

        setStep(step + 1);
    }

    function done() {
        const { setUploaded, setLoaded } = value;

        // For home page
        setUploaded(true);
        setLoaded(false);

        setLoading(true);

        // Lookup write-ups path
        const writeUps = files.find(({ id }) => id === "write-ups").file.path;

        console.log("Dispatching to server:", writeUps);

        electron.ipcRenderer.send("upload", writeUps);
    }

    function renderWizardView() {
        const { id, title, subtitle } = wizardSlides[step];
        const currentFile = files.find(({ id: fileID }) => id === fileID);

        function addFile(setID, file) {
            const nextFiles = [
                ...files.filter(({ id: fileID }) => setID !== fileID),
                {
                    id,
                    file
                }
            ];

            setFiles(nextFiles);
        }

        function uploadFile(file) {
            addFile(id, file);
        }

        return (
            <WizardView
                loading={ loading }
                step={ step + 1 }
                title={ title }
                subtitle={ subtitle }
                file={
                    currentFile
                        ? currentFile.file
                        : null
                }
                prevable={ prevable }
                nextable={ nextable }
                upload={ uploadFile }
                prev={ prev }
                next={ next }
            />
        );
    }

    function renderWizardContents() {
        if (!started) {
            return (
                <Landing
                    start={ () => setStarted(true) }
                />
            );
        }

        if (reachedEnd) {
            return (
                <Results
                    files={ files }
                    done={ done }
                    prev={ prev }
                />
            );
        }

        return renderWizardView();
    }

    return (
        <WizardViewWrapper
            percent={ calculatePercentage() }
            showProgress={ started }
        >
            { renderWizardContents() }
        </WizardViewWrapper>
    );
};

Wizard.propTypes = {
    value: PropTypes.shape({}).isRequired
};

export default withDataStore(Wizard);
