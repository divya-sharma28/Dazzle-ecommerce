import orderModel from "../models/order.model"

export const addOrder = async (req, res) => {
    try {
        const addData = new orderModel(req.body)
        console.log(req.body)
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
// export const updateOrder = async (req, res) => {
//     try {
//         const orderID = req.params.orderID;
//         const {status,productID} = req.body;
//         console.log(req.body.status, "order")

//         // const beforeUpdate = await orderModel.findOne({_id: orderID})
//         const updateData = await orderModel.updateOne({ _id: orderID,'[products].productID':productID },
//             { $set: {'products.status': status}}, { new: true });

//         const getUpdated = await orderModel.findOne({_id: orderID})
//         if (updateData.modifiedCount > 0) {
//             res.status(201).json({
//                 data: getUpdated,
//                 message: 'Data updated successfully!'
//             })
//         } else {
//             res.status(400).json({
//                 message: 'Failed to update data!'
//             })
//         }

//     } catch (error) {
//         res.status(500).json({
//             message: `Server Error: ${error.message}`
//         });
//     }
// }

export const updateOrder = async (req, res) => {
    try {
        const orderID = req.params.orderID;
        const { status, productID } = req.body;

        // Find the order by ID
        const order = await orderModel.findById(orderID);

        if (!order) {
            return res.status(404).json({
                message: 'Order not found!'
            });
        }

        // Find the index of the product to update
        const productIndex = order.products.findIndex(product => product.productID.toString() === productID);

        if (productIndex === -1) {
            return res.status(404).json({
                message: 'Product not found in order!'
            });
        }

        // Update the status of the product
        order.products[productIndex].status = status;

        // Save the updated order
        const updatedOrder = await order.save();

        res.status(200).json({
            data: updatedOrder,
            message: 'Data updated successfully!'
        });
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
};




export const deleteOrder = async (req, res) => {
    try {
        const orderID = req.params.orderID;
        const deleteData = await orderModel.deleteOne({ _id: orderID })

        if (deleteData) {
            res.status(201).json({
                data: deleteData,
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
export const getUserOrder = async (req, res) => {
    try {
        const userID = req.params.userID;
        const getData = await orderModel.find({ userID: userID })

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
export const getAllOrders = async (req, res) => {
    try {

        const getData = await orderModel.find()
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

// GET MONTHLY INCOME

export const getIncome = async (req, res) => {

    try {
        const prodId = req.query.pid
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
        const prevMonth = new Date(lastMonth.setMonth(lastMonth.getMonth() - 1))
        console.log(prodId)
        const income = await orderModel.aggregate([
            {
                $match:{
                    createdAt: {$gte: prevMonth},
                     ...(prodId && {
                        products:{$elemMatch : {productId: prodId}}
                    }) ,
                },
            },

            {
                $project:{
                   month: { $month: "$createdAt"} ,
                   sales:"$totalAmount"
                }
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum: "$sales"}
                }
            }
        ])

        if(income){
            res.status(200).json({
                data: income,
                message: 'Monthly income displayed!'
            })
          }
          else{
            res.status(400).json({
                message: 'Error while displaying monthly income!'
            })
          }
    


    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
}