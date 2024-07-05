import React, { useEffect, useState } from 'react'
import '../styles/NewProduct.css'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage'
import applic from '../firebase'
import { addProducts } from '../redux/actions/productAction'
import { useDispatch, useSelector } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NewProduct = () => {
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState([])
  const [size, setSize] = useState([])
  const [color, setColor] = useState([])
  const [uploadProgress, setProgress] = useState(0)

  const dispatch = useDispatch()
  // const error = useSelector(state => state.product.error)
  const notify = () => toast.success("Product added to database!");
  const notifyWarn = () => toast.warning("Upload process started...");

  const handleChange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  console.log(cat)
  const handleCat = (e) => {
    setCat(e.target.value.split(','))
  }


  const handleColor = (e) => {
    setColor(e.target.value.split(','))
  }

  const handleSize = (e) => {
    setSize(e.target.value.split(','))
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
          const product = { ...inputs, image: downloadURL, categories: cat, color, size };
          dispatch(addProducts(product))
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
    <div className="newProduct">
      <h1 className="addProductTitle">Add New Product</h1>

      <form className="addProductForm">

        <div className="left">
          <div className="addProductItem">
            <label>Image</label>
            <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
            <span>{!uploadProgress == 0 && `Upload is ${Math.round(uploadProgress * 10) / 10}% done`}</span>
            <small style={{ color: 'orangered', fontWeight: '500' }}>{uploadProgress > 0 && uploadProgress < 100 && "Do not refresh or leave this page till 100% upload!"}</small>
            <small style={{ color: 'green', fontWeight: '500' }}>{uploadProgress == 100 && "Upload successful!"}</small>
          </div>
          <div className="addProductItem">
            <label>Title</label>
            <input type="text" name="title" placeholder="Product Title" onChange={handleChange} />
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input type="text" name="price" placeholder="Product Price" onChange={handleChange} />
          </div>
          <div className="addProductItem">
            <label>Colors</label>
            <input type="text" name="price" placeholder="Example: red,blue" onChange={handleColor} />
          </div>

        </div>

        <div className="right">

          <div className="addProductItem">
            <label>Sizes</label>
            <input type="text" placeholder="Example: S,M,L" onChange={handleSize} />
          </div>
          <div className="addProductItem">
            <label>Categories</label>
            <input type="text" placeholder="Example: jeans,shirt" onChange={handleCat} />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input type="text" name="desc" placeholder="Product Description" onChange={handleChange} />
          </div>
          <div className="addProductItem">
            <label>Stock</label>
            <select onChange={handleChange} name="inStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button className="addProductButton" onClick={handleClick}>Create</button>
        </div>
      </form>
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
    </div>)
}

export default NewProduct