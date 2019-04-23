import React from "react";

import styles from "./Skeleton.module.scss";

const Header = () => (
    <header
        className={ styles.header }
    >
        <div>
            Links
        </div>
        <div
            className={ styles.picture }
        />
    </header>
);

export default Header;
