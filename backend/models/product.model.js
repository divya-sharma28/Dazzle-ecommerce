import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({

    title:{
        type:String,
        required: true,
        unique: true
    },
    desc:{
        type:String,
        required: true,
    },
    image:{
        type:String,
        required: true,
    },
    categories:{
        type:Array,
    },
    size:{
        type:Array,   
    },
    color:{
        type:Array,
        
    },
    price:{
        type:Number,
        required: true,

    },
    inStock:{
        type: Boolean,
        default: true
    }
    
},{
    timestamps:true
});

export default mongoose.model('product', productSchema);