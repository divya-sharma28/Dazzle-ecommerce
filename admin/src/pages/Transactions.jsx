import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getOrders } from '../redux/actions/orderAction';
import { useDispatch } from 'react-redux';
import '../styles/Transactions.css';
import { useSelector } from 'react-redux';
import { updateOrder } from '../redux/actions/orderAction';
import {format} from 'date-fns'

const Transactions = () => {
  const orders = useSelector((state) =>
    state.order.orders.flatMap((order) =>
      order.products.map((product) => ({
        id: product._id, // Using the correct field name
        orderId: order._id, // Order ID repeated for each product
        productId: product.productID, // Add productId here
        title: product.title,
        price: product.price,
        totalAmount: order.totalAmount,
        status: product.status,
        color: product.color,
        size:product.size,
        quantity: product.quantity,
        date: format(new Date(order.createdAt),'dd-MM-yyyy')
      }))
    )
  );
  const dispatch = useDispatch();
 
  const columns = [
    { field: 'orderId', headerName: 'Order ID', width: 200 },
    { field: 'title', headerName: 'Title', width: 120 },
    { field: 'price', headerName: 'Price', width: 70 },
    { field: 'color', headerName: 'Color', width: 70},
    { field: 'size', headerName: 'Size', width: 40 },
    { field: 'quantity', headerName: 'Qty', width: 40 },
    { field: 'date', headerName: 'Date', width: 90 },
    { field: 'totalAmount', headerName: 'Total', width: 60 },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      renderCell: (params) => {
        return (
          <select onChange={(e) => handleStatusChange(e, params.row.orderId, params.row.productId)} defaultValue={params.row.status}>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="dispatched">Dispatched</option>
            <option value="returned">Returned</option>
            <option value="cancelled">Cancelled</option>
          </select>
        );
      },
    },
  ];

  const handleStatusChange = (e, orderId, prodId) => {
    // Handle status change here and update the backend
    const newStatus = e.target.value;
    console.log(newStatus)

    // how do i pass product id to dispatch
    dispatch(updateOrder({_id:orderId, status:newStatus, productID:prodId}))
  };

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div className="transac">
      <DataGrid
        rows={orders}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        pageSizeOptions={[8, 10]}
      />
    </div>
  );
};

export default Transactions;
