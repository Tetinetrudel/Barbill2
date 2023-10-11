import React from 'react'
import { FaSuitcase, FaUsers, FaFileInvoiceDollar } from 'react-icons/fa'
import { MdInventory2, MdDashboard } from 'react-icons/md'

export const sidebarMenu = [
    {
        title: "Dashboard",
        path: "/",
        icon: <MdDashboard />
    },
    {
        title: "Produits",
        path: "/products",
        icon: <FaSuitcase />
    },
    {
        title: "Clients",
        path: "/clients",
        icon: <FaUsers />
    },
    {
        title: "Inventaire",
        path: "inventory",
        icon: <MdInventory2 />
    },
    {
        title: "Rapports",
        path: "/reports",
        icon: <FaFileInvoiceDollar />
    }
]