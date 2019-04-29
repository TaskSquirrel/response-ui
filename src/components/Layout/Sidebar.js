import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

import MatchesPath from "../Router/MatchesPath";

import styles from "./Sidebar.module.scss";

const Sidebar = ({
    links
}) => (
    <aside
        className={ classNames(
            styles.sidebar
        ) }
    >
        <div
            className={ styles.corner }
        >
            Corner
        </div>
        <nav
            className={ styles.navigation }
        >
            <ul
                className={ styles.group }
            >
                {
                    links.map(({
                        path,
                        title,
                        exact,
                        icon
                    }) => (
                        <MatchesPath
                            key={ path }
                            path={ path }
                            exact={ exact }
                        >
                            { matches => (
                                <li
                                    key={ title }
                                    className={ classNames(
                                        styles.item,
                                        matches && styles.selected
                                    ) }
                                >
                                    <Link
                                        to={ path }
                                        className={ styles.link }
                                    >
                                        <span
                                            className={ classNames(
                                                styles.highlight,
                                                matches && styles.selected
                                            ) }
                                        />
                                        <span
                                            className={ styles.icon }
                                        >
                                            {
                                                icon && (
                                                    <img
                                                        src={ icon }
                                                        alt={ title }
                                                    />
                                                )
                                            }
                                        </span>
                                        <span
                                            className={ styles.title }
                                        >
                                            { title }
                                        </span>
                                    </Link>
                                </li>
                            ) }
                        </MatchesPath>
                    ))
                }
            </ul>
        </nav>
    </aside>
);

Sidebar.propTypes = {
    links: PropTypes
        .arrayOf(PropTypes.shape({}))
        .isRequired
};

export default Sidebar;
