import productModel from "../models/product.model";

export const addProduct = async (req,res)=>{
    try {
        // console.log(req.body,"req.body")
        const addData =  new productModel(req.body)
        // console.log(addData,"addData")

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
export const updateProduct = async (req,res)=>{
    try {
        const prodID = req.params.prodID;
        const updateData = await productModel.updateOne({_id:prodID},
           {$set:req.body}, {new: true});

        if (updateData.modifiedCount>0) {
            res.status(201).json({
                data: updateData,
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
export const deleteProduct = async (req,res)=>{
    try {
        const prodID = req.params.prodID;

        const findData = await productModel.findOne({_id:prodID})
        const deleteData = await productModel.deleteOne({_id:prodID})

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
export const getSingleProduct = async (req,res)=>{
    try {
        const prodID = req.params.prodID;
        const getData = await productModel.findOne({_id:prodID})

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
export const getAllProducts = async (req,res)=>{
    try {
        const qNew = req.query.new;
        const qCategory = req.query.category;

        let products;
        if(qNew){
            products = await productModel.find().sort({createdAt: -1}).limit(5)
        } 
        else if(qCategory){
            products = await productModel.find({
                categories:{
                    $in:[qCategory]
            }})
        }
        else{
            products = await productModel.find()
        }

        if (products) {
            res.status(201).json({
                data: products,
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