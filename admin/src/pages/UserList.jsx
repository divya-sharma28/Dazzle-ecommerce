import '../styles/UserList.css'
import { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { getAllUsers, deleteUser } from '../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserList = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.user.users.map(user => ({ ...user, id: user._id })));
    console.log(users, "users")

    const notify = () => toast.success("User deleted from database!");


    const handleDelete = (id) => {
        dispatch(deleteUser(id))
        notify()

    }
    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Name', width: 200 },

        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'isAdmin', headerName: 'Admin', width: 80 },
        // { field: 'transaction', headerName: 'Transaction', width: 100 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/user/${params.row._id}`}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className='userListDelete' onClick={() => handleDelete(params.row._id)} />

                    </>
                )
            }

        }
    ];

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    
    return (
        <div className="userList">
            <DataGrid
                rows={users}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
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

export default UserList