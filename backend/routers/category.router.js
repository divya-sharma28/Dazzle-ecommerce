import express from 'express'
import { addCategory, getSingleCategory, updateCategory, deleteCategory, getCategory} from '../controllers/category.controller'

const categoryRouter = express.Router()

categoryRouter.get('/all', getCategory)
categoryRouter.get('/single/:catID', getSingleCategory)
categoryRouter.post('/add', addCategory)
categoryRouter.patch('/update/:catID', updateCategory)
categoryRouter.delete('/delete/:catID', deleteCategory)

export default categoryRouter