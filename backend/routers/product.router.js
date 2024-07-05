import express from 'express'
import { addProduct, updateProduct, deleteProduct, getAllProducts, getSingleProduct } from '../controllers/product.controller'
import { verifyUser, verifyAdmin } from '../auth'

const productRouter = express.Router()

productRouter.post('/add',verifyAdmin, addProduct)
productRouter.patch('/update/:prodID',verifyAdmin, updateProduct)
productRouter.delete('/delete/:prodID',verifyAdmin, deleteProduct)
productRouter.get('/all', getAllProducts)
productRouter.get('/single/:prodID', getSingleProduct)


export default productRouter