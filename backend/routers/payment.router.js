import express from 'express'
import { paymentVerification, razorpayKey, userPayment } from '../controllers/payment.controller'
const payRouter = express.Router()

payRouter.post('/payment',userPayment);
payRouter.get('/getkey', razorpayKey);
payRouter.post('/verify',paymentVerification)
export default payRouter