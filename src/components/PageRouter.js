import React from "react";

import Router from "./Router/Router";

import links from "../routes/pages";

const PageRouter = () => (
    <Router
        routes={ links }
    />
);

export default PageRouter;
