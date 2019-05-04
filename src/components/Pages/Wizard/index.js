import React, { useState } from "react";

import Landing from "./Landing";
import WizardViewWrapper from "./WizardViewWrapper";
import WizardView from "./WizardView";

import wizardSlides from "./wizard";

const Wizard = () => {
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
        setLoading(true);

        const filePaths = files.map(({ file: { path } }) => path);

        console.log(filePaths);
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
            return "You reached the end";
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

export default Wizard;
