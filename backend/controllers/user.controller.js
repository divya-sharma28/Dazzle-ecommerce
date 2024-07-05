import userModel from "../models/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// ----------------- REGISTER NEW USER (POST) -------------------

export const register = async (req, res) => {
    try {
        const { name, email, password, confirm_password, isAdmin } = req.body;
        const userExists = await userModel.findOne({email:email});

        if(userExists){
            res.status(409).json({
                message: `${userExists.email} already exists!`
            })
        }

        else{
            if(password !== confirm_password){
                res.status(401).json({
                    message: `Password does not match!`
                })
            }
            else{
                const hashPassword = bcrypt.hashSync(password, 10);
                const addUser = new userModel({
                    name : name,
                    email: email,
                    password: hashPassword,
                    isAdmin: isAdmin
                });

                addUser.save();

                if(addUser){
                    res.status(200).json({
                        data: addUser,
                        message: `${email} registered successfully!`
                    })
                }
                else{
                    res.status(400).json({
                        message:`Registeration failed!`
                    })
                }
            }
          
        }

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}

// ----------------- USER LOGIN (POST) -------------------

export const login = async(req,res) =>{
    try {
        // console.log(req.body)
        const existUser = await userModel.findOne({email:req.body.email});

        if(existUser){
            const {password,...otherDetails} =existUser._doc

            const match = await bcrypt.compare(req.body.password, existUser.password);
            if(match){
                const token = jwt.sign({_id:existUser._id,isAdmin:existUser.isAdmin},process.env.SECRETKEY,{expiresIn:'30d'})
             
                res.status(200).json({
                    ...otherDetails,
                    token,
                    message: 'Login successful!'
                });
            }
            else{
                res.status(401).json({
                    message: 'Password incorrect!'
                });  
            }
        }
        else{
            res.status(401).json({
                message: `${req.body.email} is not registered!`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}

// ----------------- GET ALL USERS (GET) -------------------

export const getUsers = async(req,res)=>{
    try {
        const query = req.query.new
        const getData = query? await userModel.find().sort({_id:-1}).limit(5) : await userModel.find();
        

        if (getData) {
            res.status(201).json({
                data: getData,
                message: 'Data fetched successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while fetching data!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}

// ----------------- GET USERS STATS -------------------

export const getUserStats = async (req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1))
    try {
      
        const data = await userModel.aggregate([

           {
            $match:{createdAt:{$gte: lastYear}}
           },

           {
            $project:{
                month:{ $month: "$createdAt"}
            }
           }
           ,
           {
            $group:{
                _id: '$month',
                total: {$sum: 1}
                
            }
           }

        ]);

      if(data){
        res.status(200).json({
            data: data,
            message: 'User stats displayed!'
        })
      }
      else{
        res.status(400).json({
            message: 'Error while displaying stats!'
        })
      }

    } catch (error) {
         res.status(500).json({
            message: `Server Error: ${error.message}`
        }); 
    }

}
// ----------------- GET SINGLE USER (GET) -------------------

export const getUser = async(req,res)=>{
    try {
        const userID = req.params.userID
        const getuser = await userModel.findOne({_id: userID});
        // console.log(getuser)

        const {password, ...others} = getuser._doc;

        if (getuser) {
            res.status(201).json({
                data: others,
                message: 'User fetched successfully!'
            });
        }
        else  {
            res.status(400).json({
                message: 'Error while fetching user!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}

// ----------------- UPDATE USER (PATCH) -------------------

export const updateUser = async(req,res)=>{
    try {
        const userID = req.params.userID
        const {name, email, password, confirm_password, isAdmin} = req.body;

        let hashPassword;
        if(password){
            if(password !== confirm_password ){
                res.status(400).json({
                    message: 'Password does not match!'
                });
            }
            else{
                hashPassword = bcrypt.hashSync(password, 10);
            }

        }
        const updateUser = await userModel.updateOne({_id: userID},{
            $set:{
                name: name,
                email: email,
                password: hashPassword,
                isAdmin: isAdmin
            }
        },{
            new: true
        });
        
        if (updateUser.acknowledged) {
            res.status(201).json({
                data: updateUser,
                message: 'Users updated successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while updating users!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}

// ----------------- DELETE USER (DELETE) -------------------
export const deleteUser = async(req,res)=>{
    try {
        const userID = req.params.userID
        const finduser = await userModel.findOne({_id: userID});
        const deluser = await userModel.deleteOne({_id: userID})
        if (deluser) {
            res.status(201).json({
                data: finduser,
                message: 'User fetched successfully!'
            });
        }
        else {
            res.status(400).json({
                message: 'Error while fetching user!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}