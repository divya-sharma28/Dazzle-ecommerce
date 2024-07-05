import { useEffect } from 'react'
import '../styles/ProductList.css';
import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProducts, getproducts } from '../redux/actions/productAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ProductList = () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.product.products)

    const notify = () => toast.success("Product deleted from database!");

    const handleDelete = (id) => {
        console.log(id)
        dispatch(deleteProducts(id))
        notify()

    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        {
            field: 'image', headerName: 'Image', width: 100, renderCell: (params) => {
                return (
                    <div className='productListItem'>
                        <img src={params.row.image} alt="" className='productListImg' />
                    </div>
                )
            }
        },
        { field: 'title', headerName: "Title", width: 200 },
        { field: 'inStock', headerName: 'Stock', width: 100 },
        { field: 'price', headerName: 'Price', width: 100 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/product/${params.row._id}`}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className='productListDelete' onClick={() => handleDelete(params.row._id)} />

                    </>
                )
            }

        }
    ];

    useEffect(() => {
        dispatch(getproducts())
    }, [])


    return (
        <div className='productList'>
            <DataGrid
                rows={products}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                getRowId={(row) => row._id}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 8 },
                    },
                }}
                pageSizeOptions={[8, 10]}
            />

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default ProductList 