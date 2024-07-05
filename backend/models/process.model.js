import mongoose from "mongoose";

const Schema = mongoose.Schema;

const processSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectID,
        required: true
    },
    order:{
        type: Object,
        required: true
    }
},
{
    timestamps: true,

})

export default mongoose.model('processOrder', processSchema)