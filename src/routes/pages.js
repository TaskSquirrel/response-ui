import Home from "../components/Pages/Home";
import CallHistory from "../components/Pages/CallHistory";
import Wizard from "../components/Pages/Wizard";
import Numbers from "../components/Pages/Numbers";
import ViewNumber from "../components/Pages/Numbers/ViewNumber";

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
        path: "/numbers",
        exact: true,
        title: "Phone Numbers",
        component: Numbers
    },
    {
        path: "/numbers/:num",
        exact: true,
        title: "View Phone Number",
        component: ViewNumber
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
