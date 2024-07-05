import mongoose from "mongoose";

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({

    userID: {
        type: Object,
        required: true
    },

    prodID:{
        type: Object,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

}, {
    timestamps: true
});

export default mongoose.model('wishlists', wishlistSchema);