import React, { useState } from "react";

import Landing from "./Landing";
import WizardViewWrapper from "./WizardViewWrapper";
import WizardView from "./WizardView";

import wizardSlides from "./wizard";

const Wizard = () => {
    function createFilesState(collections) {
        const state = {};

        collections.forEach(({ id }) => {
            state[id] = null;
        });

        return state;
    }

    const [started, setStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [files, setFiles] = useState(createFilesState(wizardSlides));

    const { id, title, subtitle } = wizardSlides[step];
    const prevable = step > 0;
    const nextable = step < wizardSlides.length - 1;
    const currentFile = files[id];

    function calculatePercentage() {
        return (step + 1) / wizardSlides.length;
    }

    function updateFiles(slideID, fileRef) {
        setFiles({
            ...files,
            [slideID]: fileRef
        });
    }

    function uploadFile(file) {
        updateFiles(id, file);
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

        Object.keys(files).forEach(key => {
            const file = files[key];
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
                file={ currentFile }
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
