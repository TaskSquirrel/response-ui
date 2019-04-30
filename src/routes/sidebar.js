import dashboardIcon from "../assets/dashboard.svg";
import callHistoryIcon from "../assets/phone.svg";
import reportsIcon from "../assets/waves.svg";

const sidebar = [
    {
        path: "/",
        title: "Dashboard",
        exact: true,
        icon: dashboardIcon
    },
    {
        path: "/history",
        title: "Call History",
        icon: callHistoryIcon
    },
    {
        path: "/reports",
        title: "Link 3",
        icon: reportsIcon
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
