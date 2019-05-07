import React, { useState, useEffect } from "react";

import withSkeleton from "../../Layout/withSkeleton";

import styles from "./Main.module.scss";
import Section from "../../UI/Section";
import { getRandomNumbers } from "../../../api";

const Numbers = () => {
    const [numbers, setNumbers] = useState(null);

    useEffect(() => {
        if (numbers === null) {
            getRandomNumbers(50)
                .then(data => {
                    console.log(data);
                });
        }
    });

    return (
        <div
            className={ styles.container }
        >
            <Section
                heading="Search numbers"
            >
                Hello
            </Section>
        </div>
    );
};

export default withSkeleton(Numbers);
