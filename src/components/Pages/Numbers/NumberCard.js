import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import DetailCard from "../../UI/DetailCard";
import Phone from "../../SVG/PlainPhone";

import styles from "./NumberCard.module.scss";

const NumberCard = ({
    number: phoneNumber,
    count
}) => (
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
);

NumberCard.propTypes = {
    number: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    count: PropTypes.number.isRequired
};

export default NumberCard;
