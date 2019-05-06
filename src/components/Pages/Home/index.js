import React from "react";

import withSkeleton from "../../Layout/withSkeleton";
import TopCallers from "./TopCallers";
import Section from "../../UI/Section";
import InfoCard from "../../UI/InfoCard";
import ActionCard from "../../UI/ActionCard";

import styles from "./Dashboard.module.scss";

const Home = () => {
    const actions = [
        {
            title: "Search by phone number",
            link: "/phone"
        },
        {
            title: "View call reports",
            link: "/"
        },
        {
            title: "Reanalyze",
            link: "/"
        }
    ];

    const stats = [
        {
            title: "Total Calls",
            value: 400
        },
        {
            title: "Average Call Duration",
            value: 14,
            unit: "minutes"
        },
        {
            title: "Unique Phone Numbers",
            value: 582
        }
    ];

    return (
        <div
            className={ styles.dashboard }
        >
            <Section
                heading="Overview"
                contentClassName={ styles["overview-cards"] }
            >
                <InfoCard
                    className={ styles.stats }
                    items={ stats }
                />
                <InfoCard
                    className={ styles.second }
                    items={ [...stats, { title: "swag", value: 1000 }] }
                />
                <div
                    className={ styles.actions }
                >
                    {
                        actions.map(action => (
                            <ActionCard
                                { ...action }
                                key={ action.title }
                                className={ styles.action }
                            />
                        ))
                    }
                </div>
            </Section>
            <Section
                heading="Data"
                contentClassName={ styles.numbers }
            >
                <TopCallers />
                <Section
                    component="div"
                    heading="Call Reports"
                    headingSize="small"
                    contentClassName={ styles.content }
                >
                    Failed to load module!
                </Section>
            </Section>
        </div>
    );
};

export default withSkeleton(Home);
