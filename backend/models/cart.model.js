import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema({

    userID:{
        type:String,
        required: true,
    },
    title:{
        type:String,
        required: true,
    },

    productID:{
        type:String,
        required: true,
    },

    image:{
        type:String,
        required: true,
    },
    color:{
        type:String,
        required: true,
    },
    size:{
        type:String,
        required: true,
    },

    price:{
        type:Number,
        required: true,
    },
    
    quantity:{
        type:Number,
        default: 1
    },

    
    
},{
    timestamps:true
});

export default mongoose.model('cart', cartSchema);