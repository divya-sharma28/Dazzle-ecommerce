import cartModel from '../models/cart.model'

export const addCart = async (req,res)=>{
    try {
        const addData = new cartModel(req.body)

        // console.log(req.body)
        const saved = await addData.save()

        if (saved) {
            res.status(201).json({
                data: addData,
                message: 'Data added successfully!'
            })
        } else {
            res.status(400).json({
                message: 'Failed to add data!'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}
export const updateCart = async (req,res)=>{
    try {
        const cartID = req.params.cartID;
        const { quantity} = req.body
        // console.log(cartID) //64c7489412088868d2401871
        // console.log(req.body) // { price: 1338, quantity: 2 }
        const data = await cartModel.findOne({_id: cartID});
        const orignalPrice = data.price/data.quantity

        const updateData = await cartModel.updateOne({_id:cartID},
           {$set:{
            price:orignalPrice*quantity,
            quantity: quantity
           }}, {new: true});

           
        if (updateData.modifiedCount>0) {
            const dataUpdated = await cartModel.findOne({_id:cartID}) 
            res.status(201).json({
                data: dataUpdated,
                message: 'Data updated successfully!'
            })
        } else {
            res.status(400).json({
                message: 'Failed to update data!'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}
export const deleteCart = async (req,res)=>{
    try {
        const cartID = req.params.cartID;
        const findData = await cartModel.findOne({_id:cartID})
        const deleteData = await cartModel.deleteOne({_id:cartID})

        if (deleteData) {
            res.status(201).json({
                data: findData,
                message: 'Data deleted successfully!'
            })
        } else {
            res.status(400).json({
                message: 'Failed to delete data!'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}
export const getUserCart = async (req,res)=>{
    try {
        const userID = req.params.userID;
        const getData = await cartModel.find({userID:userID})
        // const priceArr = getData.map(val=> val.price)
        // const total = priceArr.reduce((a,b)=> a+b,0)
        if (getData) {
            res.status(201).json({
                data: getData,
                // total: total,
                message: 'Data fetched successfully!'
            })
        } else {
            res.status(400).json({
                message: 'Failed to fetch data!'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}
export const getAllCarts = async (req,res)=>{
    try {
     
        const carts = await cartModel.find()
        if (carts) {
            res.status(201).json({
                data: carts,
                message: 'Data fetched successfully!'
            })
        } else {
            res.status(400).json({
                message: 'Failed to fetch data!'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}