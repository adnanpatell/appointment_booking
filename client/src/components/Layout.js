import React, { useState } from 'react'
import '../layout.css'
import {Link, useLocation} from "react-router-dom"
import { useSelector } from 'react-redux'
function Layout({children}) {
    const {user} = useSelector((state) =>state.user) 
const [collapsed, setCollapsed] = useState(false)
    const location = useLocation();

const userMenu = [
    {
        name: 'Home',
        path:'/',
        icon:'ri-home-2-line'
    },
    {
        name: "Appointments",
        path: "/appointments",
        icon: "ri-file-list-line"
    },
    {
        name: "Apply Officer",
        path:"/apply-doctor",
        icon:"ri-shield-user-line"
    },
    {
        name: "Profile",
        path:"/profile",
        icon:'ri-profile-line'
    },
    {
        name:"logout",
        path:"/logout",
        icon:"ri-logout-circle-r-line"
    }

]
const userMenuToBeRendered = userMenu



  return (
    <div className='main'>
      <div className="d-flex layout">
        <div className='sidebar'>
        <div className="sidebar-header">
            <h1>JSK</h1>
        </div>
        <div className="menu">
            {userMenuToBeRendered.map((menu) =>{
                const isActive = location.pathname === menu.path
                return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`} >
                    <i className={menu.icon}></i>
                   {!collapsed &&  <Link to={menu.path}>{menu.name}</Link>}
                </div>
            })}
        </div>
        </div>
        <div className="content">
            <div className="header">
         {collapsed ?   <i className="ri-menu-line header-action-icon" onClick={()=>setCollapsed(false)}></i> :   <i className="ri-close-line header-action-icon" onClick={()=>setCollapsed(true)}></i>}

         <div className="d-flex">
         <i className="ri-notification-4-fill header-action-icon mr-2"></i>
         <Link className='anchor' to='/profile'>{user?.name}</Link>
         </div>
            </div>
            <div className="body">
                {children}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
