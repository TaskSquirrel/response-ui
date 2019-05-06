import Dashboard from "../components/SVG/Dashboard";
import Phone from "../components/SVG/Phone";
import Waves from "../components/SVG/Waves";

const sidebar = [
    {
        path: "/",
        title: "Dashboard",
        exact: true,
        icon: Dashboard
    },
    {
        path: "/numbers",
        title: "Phone Numbers",
        icon: Phone
    },
    {
        path: "/reports",
        title: "Link 3",
        icon: Waves
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

export default sidebar;
