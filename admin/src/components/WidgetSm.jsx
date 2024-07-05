import React, { useEffect, useState } from 'react'
import '../styles/WidgetSm.css'
import { Visibility } from "@mui/icons-material";
import {format} from 'timeago.js'

const WidgetSm = ({users}) => {

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Registered Users</span>
      <ul className="widgetSmList">
        {users.slice(0,10).map(user => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={"https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Pic.png" }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.name}</span>
              {/* <span className="widgetSmUserTitle">Software Engineer</span> */}
            </div>
            
            <span>{format(user.createdAt)}</span>
          </li>
        ))}

      </ul>
      
    </div>
  )
}

export default WidgetSm