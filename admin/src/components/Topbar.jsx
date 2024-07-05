import React from 'react'
import '../styles/Topbar.css'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { logout } from '../redux/reducers/userReducer'

const Topbar = () => {
  const admin = useSelector(state=> state.user.currentUser)

  const dispatch = useDispatch()


  return (
    <div className="topbar">
    <div className="topbarWrapper">
      <div className="topLeft">
        <span className="logo">Dazzle admin</span>
      </div>
      <div className="topRight">
        <p className='greet'> {admin&& `Hi ${admin.name}!`}</p>
      { admin? <h3 onClick={()=>dispatch(logout())}>Logout</h3> :
      <Link to='/login' style={{textDecoration: 'none', color:'inherit'}}>
      <h3>Login</h3>
      </Link>
       }
        <img src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Pic.png" alt="" className="topAvatar" />
      </div>
    </div>
  </div>
  )
}

export default Topbar