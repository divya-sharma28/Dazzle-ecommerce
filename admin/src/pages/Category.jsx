import React, { useState, useEffect } from 'react'
import '../styles/Category.css'
import { useParams } from 'react-router-dom'
 import { useDispatch, useSelector } from 'react-redux'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from 'firebase/storage'
import applic from '../firebase'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategory, updateCat } from '../redux/actions/categoryAction'


const Category = () => {
    const {catId} = useParams();
    const category = useSelector(state => state.category.singleCategory)
    console.log(category)
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState({})
    const [uploadProgress, setProgress] = useState(0)

    const notify = () => toast.success("Category updated to database!");

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getCategory(catId))
    },[catId])

    const handleChange=(e)=>{
        setTitle(prev=> ({
            ...prev, [e.target.name]:e.target.value
        }))
    }


    const handleClick =(e)=>{
        e.preventDefault()
        if(file!==null){
            const fileName = file.name + Date.now()
            const storage = getStorage(applic)
            const storageRef = ref(storage, fileName)
    
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              setProgress(progress)
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  // console.log('File available at', downloadURL);
                  const payload ={...title,
                     image:downloadURL,
                        _id:catId
                    };
                  dispatch(updateCat(payload))
              
                });
              }
            );
        }
        const payload ={...title,
                _id:catId
            }; 

            dispatch(updateCat(payload))
            if(file==null && uploadProgress !== 100){
                notify()
            }
    }

    useEffect(() => {
        if (uploadProgress == 100) {
          notify()
        }
      }, [uploadProgress])

  return (
    <div className='category'>
        <div className="catContainer">
            <div className="catLeft">
                <div className="imgDiv">
                <img src={category.image} alt="" className='catUploadImg' />
                </div>
                <input type="file" id="file"  onChange={e =>setFile(e.target.files[0])}/>
                <div style={{display:'flex',flexDirection:'column'}}>
                        <span>{!uploadProgress == 0 && `Upload is ${Math.round(uploadProgress * 10) / 10}% done`}</span>
            <small style={{ color: 'orangered', fontWeight: '500' }}>{uploadProgress > 0 && uploadProgress < 100 && "Do not refresh or leave this page till 100% upload!"}</small>
            <small style={{ color: 'green', fontWeight: '500' }}>{uploadProgress == 100 && "Upload successful!"}</small>
                        </div>

            </div>
            <div className="catRight">
                <label>Category Title</label>
                <input className='catTitle' name='title' type='text' onChange={handleChange} defaultValue={category.title}/>

                <button className="catButton" onClick={handleClick}>Update</button>

            </div>
        </div>

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

export default Category