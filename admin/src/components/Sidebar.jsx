import React from 'react'
import '../styles/Sidebar.css'
import { Link, useLocation } from 'react-router-dom';
import {
  LineStyle,
  PermIdentity,
  Storefront,
  AttachMoney,
  Category
} from '@mui/icons-material';
const Sidebar = () => {

  const location = useLocation();

  const isActiveLink = (pathname) => {
    return location.pathname === pathname;
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
          <Link to="/" className="link">
              <li className="sidebarListItem" id={isActiveLink('/') ? "active" : ""}>
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem" id={isActiveLink('/users') ? "active" : ""}>
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem" id={isActiveLink('/products') ? "active" : ""}>
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/categories" className="link">
              <li className="sidebarListItem" id={isActiveLink('/categories') ? "active" : ""}>
                <Category className="sidebarIcon" />
                Category
              </li>
            </Link>

            <Link to="/transactions" className="link">
            <li className="sidebarListItem" id={isActiveLink('/transactions') ? "active" : ""}>
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Create Data</h3>
          <ul className="sidebarList">
            <Link to="/newuser" className="link">
              <li className="sidebarListItem" id={isActiveLink('/newuser') ? "active" : ""}>
                <PermIdentity className="sidebarIcon" />
                Add user
              </li>
            </Link>
            <Link to="/newproduct" className="link">
              <li className="sidebarListItem" id={isActiveLink('/newproduct') ? "active" : ""}>
                <Storefront className="sidebarIcon" />
                Add product
              </li>
            </Link>
            <Link to="/newCategory" className="link">
              <li className="sidebarListItem" id={isActiveLink('/newCategory') ? "active" : ""}>
                <Storefront className="sidebarIcon" />
                Add Category
              </li>
            </Link>
          </ul>
          
        </div>


      </div>
    </div>)
}

export default Sidebar