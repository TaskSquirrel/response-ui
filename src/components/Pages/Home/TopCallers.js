import React, { useState, useEffect } from "react";

import Section from "../../UI/Section";
import NumberCard from "../Numbers/NumberCard";
import Spinner from "./Spinner";

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
            <NumberCard
                number={ phoneNumber }
                count={ count }
            />
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
