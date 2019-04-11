import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

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
