import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./Sidebar.module.scss";

const Sidebar = ({
    links,
    location: { pathname: pathName }
}) => (
    <aside
        className={ styles.sidebar }
    >
        <nav
            className={ styles.navigation }
        >
            <ul
                className={ styles.group }
            >
                {
                    links.map(({ path, title }) => {
                        const pathMatches = path === pathName;

                        return (
                            <li
                                key={ title }
                                className={ classNames(
                                    styles.item,
                                    pathMatches && styles.selected
                                ) }
                            >
                                <Link
                                    to={ path }
                                    className={ styles.link }
                                >
                                    <span
                                        className={ classNames(
                                            styles.highlight,
                                            pathMatches && styles.selected
                                        ) }
                                    />
                                    <span>
                                        { title }
                                    </span>
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    </aside>
);

Sidebar.propTypes = {
    links: PropTypes
        .arrayOf(PropTypes.shape({}))
        .isRequired,

    // React router
    location: PropTypes.shape({}).isRequired
};

export default withRouter(Sidebar);
