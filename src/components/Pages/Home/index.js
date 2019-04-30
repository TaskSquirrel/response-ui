import React, { useState } from "react";

import electron from "../../../utils/electron";
import withSkeleton from "../../Layout/withSkeleton";
import TextBox from "../../Form/TextBox";
import Button from "../../Form/Button";

const Home = () => {
    const [text, setText] = useState("");

    function run() {
        electron.ipcRenderer.send("welcome", text);
    }

    return (
        <>
            <TextBox
                value={ text }
                onChange={ ({ target: { value } }) => setText(value) }
            />
            <Button
                onClick={ run }
            >
                Go!
            </Button>
        </>
    );
};

export default withSkeleton(Home);
