import React, {  useState, useEffect } from 'react'
import '../styles/Product.css'
import { useParams } from 'react-router-dom'
 import { useDispatch, useSelector } from 'react-redux'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from 'firebase/storage'
import applic from '../firebase'
import { getproduct, updateProducts } from '../redux/actions/productAction'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Product = () => {
    const { productId } = useParams();
    const product = useSelector(state => state.product.singleProduct)
    const [updateData, setUpdateData] = useState({})
    const [Cat, setCat] = useState([])
    const [upSize, setUpSize] = useState([])
    const [upColor, setUpColor] = useState([])
    const [file, setFile] = useState(null)
    const [uploadProgress, setProgress] = useState(0)


    const notify = () => toast.success("Product updated to database!");

     const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getproduct(productId))
    },[productId])

    const handleChange=(e)=>{
        setUpdateData(prev=> ({
            ...prev, [e.target.name]:e.target.value
        }))
    }
    const handleCat=(e)=>{
        setCat(e.target.value.split(","))
    }
    const handleSize=(e)=>{
        setUpSize(e.target.value.split(","))
    }
    const handleColor=(e)=>{
        setUpColor(e.target.value.split(","))

    }
    // console.log(product,"products")
    // console.log(updateData)
    // console.log(upColor)
    // console.log(upSize)


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
                  const payload ={...updateData,
                     image:downloadURL,
                     categories: Cat || product.categories,
                      size:upSize || product.size,
                       color:upColor || product.color,
                        _id:productId
                    };
                  dispatch(updateProducts(payload))
              

                });
              }
            );
        }
        const payload ={...updateData,
             categories: Cat,
              size:upSize ,
               color:upColor,
                _id:productId
            }; 
            dispatch(updateProducts(payload))
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
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Update Product</h1>
             
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product?.image} alt="" className="productInfoImg" />
                        <span className="productName">{updateData.title||product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product?._id}</span>
                        </div>

                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">{JSON.stringify(product?.inStock)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" placeholder={product?.title} name='title' onChange={handleChange}  defaultValue={product.title} />
                        <label>Product Description</label>
                        <input type="text" placeholder={product?.desc} name='desc' onChange={handleChange}  defaultValue={product.desc}/>
                        <label>Price</label>
                        <input type="Number" placeholder={product?.price} name='price' onChange={handleChange}  defaultValue={product.price} />
                        <label>Categories</label>
                        <input type="text" placeholder={product?.categories} name='categories' onChange={handleCat} defaultValue={product.categories}/>
                        <label>Size</label>
                        <input type="text" placeholder={product?.size} name='size' onChange={handleSize} defaultValue={product.size} />
                        <label>Color</label>
                        <input type="text" placeholder={product?.color} name='color' onChange={handleColor} defaultValue={product.color}/>
                        <label>In Stock</label>
                        <select name="inStock" id="idStock" style={{ width: '100px' }} onChange={handleChange} defaultValue={product.inStock}>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product?.image} alt="" className="productUploadImg" />
                        
                            <input type="file" id="file"   onChange={e =>setFile(e.target.files[0])}/>
                        </div>
                        <div style={{display:'flex',flexDirection:'column'}}>
                        <span>{!uploadProgress == 0 && `Upload is ${Math.round(uploadProgress * 10) / 10}% done`}</span>
            <small style={{ color: 'orangered', fontWeight: '500' }}>{uploadProgress > 0 && uploadProgress < 100 && "Do not refresh or leave this page till 100% upload!"}</small>
            <small style={{ color: 'green', fontWeight: '500' }}>{uploadProgress == 100 && "Upload successful!"}</small>
                        </div>
                        <button className="productButton" onClick={handleClick}>Update</button>
                    </div>
                </form>
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
        </div>)
}

export default Product