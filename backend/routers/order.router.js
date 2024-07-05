import express from 'express'
import { addOrder, updateOrder, deleteOrder, getAllOrders, getUserOrder,getIncome } from '../controllers/order.controller'
import {verifyAdmin, verifyUser} from '../auth'
const orderRouter = express.Router()

orderRouter.post('/add',verifyUser, addOrder)
orderRouter.patch('/update/:orderID',verifyAdmin, updateOrder)
orderRouter.delete('/delete/:orderID',verifyAdmin, deleteOrder)
orderRouter.get('/single/:userID', getUserOrder)
orderRouter.get('/all',verifyAdmin, getAllOrders)
orderRouter.get('/income',verifyAdmin, getIncome)

export default orderRouter