import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from "body-parser"
import cors from 'cors';
import Razorpay from "razorpay"



// ROUTERS
import userRouter from "./routers/user.router";
import productRouter from "./routers/product.router";
import orderRouter from "./routers/order.router";
import cartRouter from "./routers/cart.router";
import payRouter from "./routers/payment.router";
import wishRouter from "./routers/wishlist.router";
import categoryRouter from "./routers/category.router";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000

var corsOptions = {
    origin:  [
      process.env.REACT_URL1,
      process.env.REACT_URL2,
  ],
    optionsSuccessStatus:200
  }
  app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use(cookieParser())

app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})

mongoose.connect(`${process.env.MONGO_URL}/dazzle`)
  .then(() => console.log(`Connected to Dazzle!`))
  .catch(()=> console.log(`Error connecting to database`));

 
app.use('/dazzle/user', userRouter)  
app.use('/dazzle/product', productRouter)  
app.use('/dazzle/cart', cartRouter)  
app.use('/dazzle/order', orderRouter)  
app.use('/dazzle/checkout', payRouter)  
app.use('/dazzle/wishlist', wishRouter)  
app.use('/dazzle/category', categoryRouter)  

export const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});
