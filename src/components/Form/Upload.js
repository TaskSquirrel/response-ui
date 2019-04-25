import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import noop from "../../utils/noop";

import styles from "./Upload.module.scss";

const Upload = ({
    file,
    onUpload
}) => {
    const [hovering, setHovering] = useState(false);

    function renderFileDialog() {
        if (hovering) {
            return "Drop the file!";
        }

        if (!file) {
            return (
                <React.Fragment>
                    <span
                        className={ styles.choose }
                    >
                        Choose
                    </span>
                    <span>
                        { " or drag files here" }
                    </span>
                </React.Fragment>
            );
        }

        return (
            <span
                className={ styles.filename }
            >
                { file.name }
            </span>
        );
    }

    function uploadFiles(files) {
        onUpload(files.item(0));
    }

    function handleFileUpload({ target: { files } }) {
        uploadFiles(files);
    }

    function handleDrop(e) {
        e.preventDefault();
        setHovering(false);

        uploadFiles(e.dataTransfer.files);
    }

    return (
        <div
            className={ styles.upload }
        >
            <input
                type="file"
                className={ classNames(
                    styles.file
                ) }
                onChange={ handleFileUpload }
                onDragOver={ () => setHovering(true) }
                onDragLeave={ () => setHovering(false) }
                onDrop={ handleDrop }
            />
            <div
                className={ styles.text }
            >
                { renderFileDialog() }
            </div>
        </div>
    );
};

Upload.propTypes = {
    file: PropTypes.instanceOf(File),
    onUpload: PropTypes.func
};

Upload.defaultProps = {
    file: null,
    onUpload: noop
};

export default Upload;
