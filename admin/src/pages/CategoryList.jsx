import React from 'react'
import '../styles/CategoryList.css'
import { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategories, deleteCat } from '../redux/actions/categoryAction';


const CategoryList = () => {
    const dispatch = useDispatch()
    const cats = useSelector(state => state.category.categories.map(cat => ({ ...cat, id: cat._id })));

    const notify = () => toast.success("Category deleted from database!");

    const handleDelete = (id) => {
        dispatch(deleteCat(id))
        notify()

    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        {
            field: 'image', headerName: 'Image', width: 300, renderCell: (params) => {
                return (
                    <div className='catListItem'>
                        <img src={params.row.image} alt="" className='catListImg' />
                    </div>
                )
            }
        },
        { field: 'title', headerName: "Title", width: 200 },
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/category/${params.row._id}`}>
                            <button className="catListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className='catListDelete' onClick={() => handleDelete(params.row._id)} />

                    </>
                )
            }

        }
    ]

    const getRowHeight = (params) => {
        return 200; // Adjust this value as needed
    };

    useEffect(() => {
        dispatch(getCategories())
    }, [])
    return (
        <div className='categoryList'>

            <DataGrid
                rows={cats}
                getRowHeight={getRowHeight}
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

export default CategoryList