import express from 'express'
import { register, login, getUser, getUsers, updateUser, deleteUser, getUserStats } from '../controllers/user.controller'
import { verifyToken, verifyUser, verifyAdmin } from '../auth'

const userRouter = express.Router()

// userRouter.get('/checkauth',verifyToken,(req,res,next)=>{
//     res.send('hello user, you are logged in')
// })
// userRouter.get('/checkuser/:id',verifyUser,(req,res,next)=>{
//     res.send('hello user, you are logged in and you can delete your account')
// })
// userRouter.get('/checkadmin/:id',verifyAdmin,(req,res,next)=>{
//     res.send('hello admin, you are logged in and you can delete all accounts')
// })

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/all',verifyAdmin, getUsers)
userRouter.get('/stats',verifyAdmin, getUserStats)
userRouter.get('/single/:userID',verifyAdmin, getUser)
userRouter.patch('/update/:userID',verifyAdmin, updateUser)
userRouter.delete ('/delete/:userID',verifyUser, deleteUser)


export default userRouter