import crypto from 'crypto'
import { instance } from '../index';
import processModel from '../models/process.model';
import cartModel from '../models/cart.model';
import orderModel from '../models/order.model';

export const userPayment = async (req, res) => {
   try {
        console.log(req.body)
      const { cartTotal, userID } = req.body


      const options = {
         amount: cartTotal * 100,
         currency: "INR",
         // receipt: "order_rcptid_11"
      };

      instance.orders.create(options, async function (err, order) {
         if (err) {
            res.status(400).json({
               message: err
            })
         }
         else {

            const processData = new processModel({
               userID: userID,
               order: order
            })

            processData.save()

            res.status(200).json({
               data: processData
            })



         }
      })


   } catch (error) {
      res.status(500).json({
         message: `Server Error ${error.message}`
      })
   }
}


export const razorpayKey = (req, res) => {

   try {

      res.status(200).json({
         key: process.env.KEY_ID
      })
   } catch (error) {
      res.status(500).json({
         message: `Server Error ${error}`
      })
   }
}


export const paymentVerification = async (req, res) => {

   try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      const processFind = await processModel.findOne({ ['order.id']: razorpay_order_id })
      console.log(processFind, "processFind")


      const userID = processFind.userID
      const body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto

         .createHmac("sha256", process.env.KEY_SECRET)

         .update(body.toString())

         .digest("hex");

      console.log(expectedSignature, "ex")
      console.log(razorpay_signature, "ac")
      const isAuthentic = expectedSignature === razorpay_signature


      if (isAuthentic) {
         console.log("fggh")
         const userCart = await cartModel.find({ userID: userID })
         console.log(userCart, "userCart")

         await orderModel.create({
            paymentID: razorpay_payment_id,
            orderID: razorpay_order_id,
            signature: razorpay_signature,
            userID: userID,
            products: userCart,
            totalAmount: processFind.order.amount / 100
         })

         await cartModel.deleteMany({ userID: userID })
         await processModel.deleteMany()

         res.redirect(`http://localhost:5173?reference=${razorpay_payment_id}`)
      }
      else {
         res.status(400).json({
            success: false,
         });
      }

   } catch (error) {
      res.status(500).json({
         message: `Server Error ${error}`
      })
   }

}