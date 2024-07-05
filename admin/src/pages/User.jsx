import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  VerifiedUserSharp
} from "@mui/icons-material";
import { Link } from 'react-router-dom';
import '../styles/User.css'
import { getUser, updateUser } from '../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = () => {


  const { userId } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.singleUser)
  const error = useSelector(state => state.user.error)
  const notify = () => toast.success("User updated from database!");

  const [upUser, setUpUser] = useState({})

  console.log(user)
  useEffect(() => {
    dispatch(getUser(userId))
  }, [userId])

  const changeHandle = (e) => {
    setUpUser(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  console.log(upUser, "upUser")
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser({ ...upUser, _id: userId }))

    if (!error) {
      notify()
    }
  }
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <h4 className="userShowTitle">User details</h4>

          <div className="userShowTop">
            <img
              src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Pic.png"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.name}</span>
            </div>
          </div>
          <div className="userShowBottom">

            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <VerifiedUserSharp className="userShowIcon" />
              <span className="userShowInfoTitle">ID:{user._id} </span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">Admin: {user.isAdmin ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">

              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  name='name'
                  className="userUpdateInput"
                  defaultValue={user.name}
                  onChange={changeHandle}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  className="userUpdateInput"
                  defaultValue={user.email}
                  onChange={changeHandle}
                />
              </div>



            </div>
            <div className="userUpdateRight">
              <div className="userUpdateItem">
                <label>Give admin rights?</label>
                <select name='isAdmin' className="userUpdateInput" defaultValue={user.isAdmin} onChange={changeHandle}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <button className="userUpdateButton" onClick={handleSubmit}>Update</button>
            </div>


          </form>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </div>)
}

export default User