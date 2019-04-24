import React, { useState } from "react";

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

    const [step, setStep] = useState(0);
    const [files, setFiles] = useState(createFilesState(wizardSlides));

    const { id, title, subtitle } = wizardSlides[step];
    const prevable = step > 0;
    const nextable = step < wizardSlides.length - 1;
    const currentFile = files[id];

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

    return (
        <WizardView
            step={ step + 1 }
            title={ title }
            subtitle={ subtitle }
            file={ currentFile }
            prevable={ prevable }
            nextable={ nextable }
            upload={ uploadFile }
            prev={ prev }
            next={ next }
        />
    );
};

export default Wizard;
