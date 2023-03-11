
import React from 'react'
// import Icon from '@mui/material/Icon';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import PaymentsIcon from '@mui/icons-material/Payments';

export const SideBarData=[
    {
        title : "Home",
        icon : <HomeIcon />,
        link : "/adminhome"
    },
    {
        title : "Stores",
        icon : <StoreIcon />,
        link : "/adminhome/stores"
    },
    {
        title : "Products",
        icon : <InventoryIcon />,
        link : "/products"
    },
    {
        title : "Customers",
        icon : <PersonIcon />,
        link : "/customers"
    },
    {
        title : "Payments",
        icon : <PaymentsIcon />,
        link : "/payments"
    }

]