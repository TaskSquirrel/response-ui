import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import styles from "./Section.module.scss";

const Section = ({
    children,
    heading,
    className,
    headingClassName,
    contentClassName
}) => (
    <section
        className={ className }
    >
        <h1
            className={ classNames(
                styles.heading,
                headingClassName
            ) }
        >
            { heading }
        </h1>
        <div
            className={ classNames(
                styles.content,
                contentClassName
            ) }
        >
            { children }
        </div>
    </section>
);

Section.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    headingClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    heading: PropTypes.string
};

Section.defaultProps = {
    className: null,
    headingClassName: null,
    contentClassName: null,
    heading: ""
};

export default Section;
