import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
// import { login } from '../redux/apiCalls';
import { login } from '../redux/actions/userAction'
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] =useState('');
  const [password, setPassword] =useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector(state => state.user.currentUser)


  const handleClick = (e)=>{
    e.preventDefault( )
    dispatch(login({email, password}));
  }

  useEffect(()=>{
      if(currentUser!==null && Object.keys(currentUser).length !==0){
          navigate('/')
      }
  },[currentUser])
  
  return (
    <div className='login'>
      <h1>Dazzle Admin</h1>
      <h3>Login</h3>
      <input type="email" placeholder='Email' onChange={e=> setEmail(e.target.value)}/>
      <input type="password" placeholder='Password' onChange={e=> setPassword(e.target.value)} />
      <button onClick={handleClick}>Login</button>
    </div>
  )
}

export default Login