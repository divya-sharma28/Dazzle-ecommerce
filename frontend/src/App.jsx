import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home';
import ProductList from './pages/ProductList';
import SingleProduct from './pages/SingleProduct';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
// import Success from './components/Success';
import Wishlist from './pages/Wishlist';
import { useSelector, useDispatch } from 'react-redux'
import { getwishByUser } from './redux/actions/wishAction';
import { getcart } from './redux/actions/cartAction';
import { useEffect } from 'react';
import Orders from './pages/Orders';



function App() {
  // const userdata = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.currentUser)

  useEffect(() => {
    dispatch(getwishByUser(user?._id))
    dispatch(getcart(user?._id))
  }, [user])
  return (
    <>


      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/products/:category' element={<ProductList />} />
          <Route path='/product/:prodID' element={<SingleProduct/>} />
          {/* <Route path='/products' element={user !== null && Object.keys(user).length !== 0 ? <ProductList /> : <Navigate to='/' />} />
          <Route path='/products/:category' element={user !== null && Object.keys(user).length !== 0 ? <ProductList /> : <Navigate to='/' />} />
          <Route path='/product/:prodID' element={user !== null && Object.keys(user).length !== 0 ? <SingleProduct /> : <Navigate to='/' />} /> */}
          <Route path='/cart' element={user !== null && Object.keys(user).length !== 0 ? <Cart /> : <Navigate to='/login' />} />
          <Route path='/wishlist' element={user !== null && Object.keys(user).length !== 0 ? < Wishlist /> : <Navigate to='/login' />} />
          <Route path='/orders' element={user !== null && Object.keys(user).length !== 0 ? <Orders /> : <Navigate to='/login' />} />


        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
