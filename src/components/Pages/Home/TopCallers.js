import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Section from "../../UI/Section";
import DetailCard from "../../UI/DetailCard";
import Spinner from "./Spinner";
import Phone from "../../SVG/PlainPhone";

import { getTopCallers } from "../../../api";

import styles from "./Dashboard.module.scss";

const TopCallers = () => {
    const [callers, setCallers] = useState(null);

    useEffect(() => {
        if (!callers) {
            getTopCallers()
                .then(c => setCallers(c));
        }
    });

    function renderContent() {
        if (!callers) {
            return (
                <Spinner />
            );
        }

        if (callers.length < 1) {
            return "No results";
        }

        return callers.map(({ phoneNumber, count }) => (
            <Link
                key={ phoneNumber }
                to={ `/numbers/${phoneNumber}` }
            >
                <DetailCard
                    active
                    title={ phoneNumber }
                    first={ `${count} total calls` }
                    icon={ () => (
                        <Phone
                            className={ styles["top-callers-icon"] }
                        />
                    ) }
                    iconClassName={ styles["top-callers-icon-container"] }
                />
            </Link>
        ));
    }

    return (
        <Section
            component="div"
            heading="Phone numbers"
            headingSize="small"
            contentClassName={ styles.content }
        >
            { renderContent() }
        </Section>
    );
};

export default TopCallers;
