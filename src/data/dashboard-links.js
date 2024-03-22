import { ACCOUNT_TYPE } from "../utils/constants";

export const sidebarLinks = [
    {
        id: 1,
        name: "My Profile",
        path: "/dashboard/my-profile",
        icon: "VscAccount",
    },
    {
        id: 2,
        name: "Dashboard",
        path: "/dashboard/dealer",
        type: ACCOUNT_TYPE.DEALER,
        icon: "VscDashboard",
    },
    {
        id: 3,
        name: "Dashboard",
        path: "/dashboard/shop-keeper",
        type: ACCOUNT_TYPE.SHOP_KEEPER,
        icon: "VscDashboard",
    },
    {
        id: 4,
        name: "My Products",
        path: "/dashboard/my-products",
        type: ACCOUNT_TYPE.DEALER,
        icon: "VscVm",
    },
    {
        id: 5,
        name: "Add Product",
        path: "/dashboard/add-product",
        type: ACCOUNT_TYPE.DEALER,
        icon: "VscAdd",
    },
    {
        id: 6,
        name: "My Orders",
        path: "/dashboard/my-orders",
        type: ACCOUNT_TYPE.FARMER,
        icon: "VscMortarBoard",
    },
    {
        id: 7,
        name: "Purchase History",
        path: "/dashboard/purchase-history",
        type: ACCOUNT_TYPE.FARMER,
        icon: "VscHistory",
    },
]