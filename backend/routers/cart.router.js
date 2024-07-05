import express from 'express'
import { getAllCarts, getUserCart, addCart, updateCart, deleteCart } from '../controllers/cart.controller'
import { verifyAdmin, verifyUser } from '../auth'
const cartRouter = express.Router()

cartRouter.post('/add/:userID',addCart)
cartRouter.patch('/update/:cartID',updateCart)
cartRouter.delete('/delete/:cartID',deleteCart)
cartRouter.get('/user/:userID',getUserCart)
cartRouter.get('/all',verifyAdmin,getAllCarts)


export default cartRouter