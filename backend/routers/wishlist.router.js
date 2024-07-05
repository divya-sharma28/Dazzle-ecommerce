import { addWish, getWishByUser, deleteWish } from "../controllers/wishlist.controller";
import express from 'express'

const wishRouter = express.Router()

wishRouter.post('/add',addWish);
wishRouter.get('/user/:userID', getWishByUser);
wishRouter.delete('/delete/:wishID', deleteWish)
export default wishRouter
