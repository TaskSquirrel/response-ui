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

    const { id, title, subtitle } = wizardSlides[step];
    const prevable = step > 0;
    const nextable = step < wizardSlides.length - 1;
    const currentFile = files.find(({ id: fileID }) => id === fileID);

    function calculatePercentage() {
        return (step + 1) / wizardSlides.length;
    }

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

        files.forEach(({ file }) => {
            const read = new FileReader();

            read.addEventListener("load", () => {
                console.log(read.result);
            });

            read.readAsDataURL(file);
        });
    }

    function renderWizardView() {
        return (
            <WizardView
                loading={ loading }
                step={ step + 1 }
                percentage={ calculatePercentage() }
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
                done={ done }
            />
        );
    }

    return (
        <WizardViewWrapper>
            {
                started
                    ? renderWizardView()
                    : (
                        <Landing
                            start={ () => setStarted(true) }
                        />
                    )
            }
        </WizardViewWrapper>
    );
};

export default Wizard;
