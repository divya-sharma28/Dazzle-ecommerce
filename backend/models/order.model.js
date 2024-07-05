import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    userID:{
        type:String,
        required: true,
    },
    products:[
        {
            productID:{
                type:Object,
            },
            
            title:{
                type:String,  
            },
            image:{
                type:String,  
            },
            size:{
                type:String,  
            },
            color:{
                type:String,  
            },
            quantity:{
                type:Number,
             },
            price:{
                type:Number,
            },
            status: { 
                type:String, 
                default:'pending'
            }
        }
    ],
    totalAmount:{
        type: Number,
        required: true
    },
    // address:{
    //     type:Object,
    //     // required: true,
    // },
 
    
},{
    timestamps:true
});

export default mongoose.model('order', orderSchema);