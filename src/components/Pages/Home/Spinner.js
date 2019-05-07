import React from "react";
import Loader from "react-loader-spinner";

import styles from "./Dashboard.module.scss";

const Spinner = () => (
    <div
        className={ styles.spinner }
    >
        <Loader
            type="Bars"
            width={ 50 }
            height={ 50 }
        />
    </div>
);

export default Spinner;
