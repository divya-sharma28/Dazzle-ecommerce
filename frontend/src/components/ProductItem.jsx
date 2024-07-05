import React from 'react';
import styled from 'styled-components';
// import Search from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { mobile } from '../responsive';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { useDispatch, useSelector } from 'react-redux';
// import { addToWish } from '../redux/wishlistRedux';
import { addwish } from '../redux/actions/wishAction';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Container = styled.div`
    flex:1;
    margin: 5px;
    min-width: 250px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eac7ed81;
    position: relative;
    ${mobile({ height: "200px" })};

  `
const PriceBox = styled.div`
    position: absolute;
    display: flex;
    top: 0px;
    right: 0px;
    background-color: #f9c5f9;
    padding: 10px;
    height: 45px;
`
const Price = styled.h1`
    font-size:25px;
`
const Symbol = styled.span`
    font-size: 15px;
`
const Circle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    ${mobile({ height: "150px", width: "150px" })};

     
`
const Image = styled.img`
    height: 80%;
    width: 100%;
    object-fit: contain;
    z-index: 2;
    ${mobile({ height: "70%" })};


`
const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;

    &:hover{
        opacity: 1;
    }

`
const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;

    &:hover{
        background-color: #dfd9d9;
        transform: scale(1.1);
        cursor: pointer;
    }

`


const ProductItem = ({ item }) => {


    // console.log(item, "product")
    const notifyOne = () => toast.success("Added to wishlist");
    const notifyTwo = () => toast.warning("Already in wishlist");

    // const user = useSelector(state=> state.user.currentUser)
    const user = useSelector(state => state.user.currentUser)

    const wishlist = useSelector(state=> state.wish.list)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }


    
    const clickHandler = (item) =>{
        // console.log(item)

        const payload ={
            userID: user?._id,
            prodID : item._id,
            image: item.image,
            price: item.price
           
            
        }
        // console.log(item)
        const exist = wishlist?.filter(wish => wish.prodID.includes(item._id))
        // console.log(exist,"exist")
        if( user!==null && Object.keys(user).length!==0){
            if(exist.length === 0){
                dispatch(addwish(payload))
                notifyOne()
            }
            else{
                notifyTwo()
            }
        }
        else{
            navigate('/login')
        } 
    }
    return (
        <Container>
            <PriceBox>
                <Symbol>₹</Symbol>
                <Price>{item.price}</Price>
            </PriceBox>
            <Circle>
                <Image src={item.image} />
            </Circle>
            <Info>

                    <Link to={`/product/${item._id}`}  onClick={scrollToTop}>
                <Icon data-tooltip-id="my-tooltip" data-tooltip-content="View">
                    <VisibilityIcon />
                </Icon>
                    </Link>

                <Icon data-tooltip-id="my-tooltip" data-tooltip-content="Add to wishlist" onClick={()=>clickHandler(item)} >
                    <FavoriteBorderIcon />
                </Icon>
                <Tooltip id="my-tooltip" />

            </Info>

            <ToastContainer position="top-center"
                            autoClose={2000}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick={false}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light" />
        </Container>
    )
}

export default ProductItem