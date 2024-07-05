import wishlistModel from "../models/wishlist.model"


export const addWish = async (req,res)=>{
    try {
        const addData = new wishlistModel(req.body)
        const saved = await addData.save()
        // console.log(saved,"saved")

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

export const deleteWish = async (req,res)=>{
    try {
        const wishID = req.params.wishID;
        const findData = await wishlistModel.findOne({_id:wishID})
        
        const deleteData = await wishlistModel.deleteOne({_id:wishID})

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

export const getWishByUser = async (req,res)=>{
    try {
        const userID = req.params.userID;
        const getData = await wishlistModel.find({userID:userID})

        if (getData) {
            res.status(201).json({
                data: getData,
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
