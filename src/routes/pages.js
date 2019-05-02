import Home from "../components/Pages/Home";
import CallHistory from "../components/Pages/CallHistory";
import Wizard from "../components/Pages/Wizard";

const pages = [
    {
        path: "/",
        title: "Dashboard",
        component: Home
    },
    {
        path: "/history",
        title: "Call History",
        component: CallHistory
    },
    {
        path: "/wizard",
        title: "Wizard",
        exact: false,
        component: Wizard
    },
    {
        path: "/reports",
        title: "Link 3"
    },
    {
        path: "/link-4",
        title: "Link 4"
    },
    {
        path: "/link-5",
        title: "Link 5"
    }
];

export default pages;
