import React,{useState, useEffect} from 'react'
import '../styles/NewUser.css'
import {addUser} from '../redux/actions/userAction'
import {useDispatch, useSelector} from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const NewUser = () => {

  const [userData, setUserData] = useState({})
  const notify1 = () => toast.success("User added to database!");
  const notify2 = () => toast.error(error)

  const error = useSelector(state=> state.user.error)
  const message = useSelector(state=> state.user.message)

  const dispatch = useDispatch()

  const handleChange = (e)=>{
    setUserData(prev => ({
      ...prev, [e.target.name]: e.target.value,
    }))
  }

  useEffect(()=>{
    if(message=='no error'){
      notify1()
   } else if (message == 'error'){
     notify2()
   }
  },[error])
  

  const clickHandler = (e)=>{
    e.preventDefault();
    dispatch(addUser(userData));
 
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" name='name' onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" name='email' onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" name='password' onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Confirm Password</label>
          <input type="password" placeholder="confirm password" name='confirm_password' onChange={handleChange}/>
        </div>
        {/* <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div> */}
        {/* <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" />
        </div> */}

        <div className="newUserItem">
        <label>Is this user an admin?</label>
        <select name="isAdmin" id="" className='newUserSelect' onChange={handleChange}>
          <option value="false">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        </div>

            <button className="newUserButton" onClick={clickHandler}>Create</button>
      </form>
      {/* <span  className='errMessage'>{}</span> */}

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
    </div>  )
}

export default NewUser