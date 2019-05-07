import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { withDataStore } from "../../DataStoreContext";
import Loading from "../../Layout/Loading";
import withSkeleton from "../../Layout/withSkeleton";
import TopCallers from "./TopCallers";
import Section from "../../UI/Section";
import InfoCard from "../../UI/InfoCard";
import ActionCard from "../../UI/ActionCard";

import styles from "./Dashboard.module.scss";
import CardBase from "../../UI/CardBase";

const Home = ({ value }) => {
    const actions = [
        {
            title: "Search by phone number",
            link: "/numbers"
        },
        {
            title: "View call reports",
            link: "/"
        },
        {
            title: "Analyze new files",
            link: "/wizard"
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

    const { loaded, uploaded } = value;

    if (!uploaded) {
        return (
            <Redirect
                to="/wizard"
            />
        );
    }

    if (!loaded) {
        return (
            <Loading
                timeout={ 5000 }
                timeoutRender={ () => (
                    <div
                        className={ styles.spinner }
                    >
                        One moment...
                    </div>
                ) }
            />
        );
    }

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
                <CardBase
                    className={ styles.missing }
                >
                    Not implemented yet!
                </CardBase>
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
                    Module not yet implemented.
                </Section>
            </Section>
        </div>
    );
};

Home.propTypes = {
    value: PropTypes.shape({}).isRequired
};

export default withSkeleton(withDataStore(Home));
