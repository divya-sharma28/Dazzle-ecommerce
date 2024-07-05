import React, { useEffect, useState } from 'react'
import '../styles/NewCategory.css'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage'
import applic from '../firebase'
import { addCategory } from '../redux/actions/categoryAction'
import { useDispatch, useSelector } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewCategory = () => {

  const [title, setTitle] = useState({})
  const [file, setFile] = useState(null)
  const [uploadProgress, setProgress] = useState(0)

  const dispatch = useDispatch()

  const notify = () => toast.success("Product added to database!");
  const notifyWarn = () => toast.warning("Upload process started...");

  const handleChange = (e) => {
    setTitle(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = file.name + Date.now()
    const storage = getStorage(applic)
    const storageRef = ref(storage, fileName)

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
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
          const payload = { ...title, image: downloadURL};
          dispatch(addCategory(payload))
        });
      }
    );
      notifyWarn()

  }

  useEffect(() => {
    if (uploadProgress == 100) {
      notify()
    }
  }, [uploadProgress])

  return (
    <div className='newCat'>
      <h1>Add New Category</h1>

      <div className="catContainer">
      <div className='addCatItem'>
      <label style={{padding:'0 10px 0 0'}}>Image:</label>
            <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
            <span>{!uploadProgress == 0 && `Upload is ${Math.round(uploadProgress * 10) / 10}% done`}</span>
            <small style={{ color: 'orangered', fontWeight: '500' }}>{uploadProgress > 0 && uploadProgress < 100 && "Do not refresh or leave this page till 100% upload!"}</small>
            <small style={{ color: 'green', fontWeight: '500' }}>{uploadProgress == 100 && "Upload successful!"}</small>
      </div>

      <div className="addCatTitle">
            <label style={{padding:'0 10px 0 0'}}>Title:</label>
            <input type="text" name="title" placeholder="Category Title" onChange={handleChange} />
      </div>

          <button className="addCatButton" onClick={handleClick}>Create</button>

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

export default NewCategory