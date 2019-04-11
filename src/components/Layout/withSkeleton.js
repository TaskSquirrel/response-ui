import React from "react";

import Skeleton from "./Skeleton";

const withSkeleton = Component => {
    const WithSkeleton = props => (
        <Skeleton>
            <Component
                { ...props }
            />
        </Skeleton>
    );

    return WithSkeleton;
};

export default withSkeleton;
