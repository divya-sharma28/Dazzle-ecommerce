 import categoryModel from "../models/category.model";

 export const addCategory = async (req,res)=>{
    try {
        const addData = new categoryModel(req.body)
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

export const deleteCategory = async (req,res)=>{
    try {
        const catID = req.params.catID;
        const findData = await categoryModel.findOne({_id:catID})
        
        const deleteData = await categoryModel.deleteOne({_id:catID })

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

export const getCategory = async (req,res)=>{
    try {
        const getData = await categoryModel.find()

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
export const getSingleCategory = async (req,res)=>{
    try {
        const catID = req.params.catID
        const getData = await categoryModel.findOne({_id:catID})

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

export const updateCategory = async (req, res) => {
    try {
        const catID = req.params.catID;

        const updateData = await categoryModel.updateOne({ _id: catID },
            { $set: req.body }, { new: true });

        if (updateData.modifiedCount > 0) {

            const getUpdated = await categoryModel.findOne({_id:catID})

            res.status(201).json({
                data: getUpdated,
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