import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Sidebar from "./Sidebar";

import sidebarRoutes from "../../routes/sidebar";

import styles from "./Skeleton.module.scss";

const Skeleton = ({
    children,
    sidebarLinks
}) => (
    <div
        className={ styles.skeleton }
    >
        <Sidebar
            links={ sidebarLinks }
        />
        <div
            className={ styles.right }
        >
            <Header />
            <main>
                { children }
            </main>
        </div>
    </div>
);

Skeleton.propTypes = {
    children: PropTypes.node.isRequired,
    sidebarLinks: PropTypes.arrayOf(PropTypes.shape({}))
};

Skeleton.defaultProps = {
    sidebarLinks: sidebarRoutes
};

export default Skeleton;
