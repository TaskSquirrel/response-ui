import Dashboard from "../components/SVG/Dashboard";
import Phone from "../components/SVG/Phone";

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
    }
];

export default sidebar;
