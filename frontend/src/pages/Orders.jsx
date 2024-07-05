import React from 'react'
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { userRequest } from '../requestMethods';
import styled from 'styled-components';
import {format} from 'timeago.js'
import { mobile, tablet } from '../responsive';
import { useSelector } from 'react-redux';
import emptyOrders from '../assets/EmptyData/empty_orders.png'
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';


const OrderContainer = styled.div`
    padding: 50px;
`
const Products = styled.div`
    width: 48%;
    min-width: 300px;
    display: flex;
    /* border: 1px solid black; */
    border-radius: 30px;
    padding: 20px;
    gap:20px;
    box-shadow: 1px 8px 38px -28px rgba(107,62,107,1);
    ${mobile({padding:"15px", gap:"5px"})}
    ${tablet({width:'90%'})}


`
const OrderDate = styled.span` 
    font-weight: bold;
    color: #050560;
    ${mobile({fontSize:'14px'})}
    ${tablet({fontSize:'15px'})}

`
const OrderBox = styled.div` 
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    ${mobile({justifyContent:'center'})}
    ${tablet({justifyContent:'center'})}

`
const ImageBox = styled.div`  
`
const Image = styled.img`  
    height: 100px;
    width: 100px;
    object-fit: contain;
`
const Top = styled.div`
    display: flex;
    gap: 5px;
`
const ProductInfo = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 3px;
`
const OrderTitle = styled.h5` 
    font-weight: 600 !important;
    font-size: 18px;
`
const OrderID = styled.h6`  
    font-weight: 600;
    color: gray;
    font-size: 13px;
`
const Price = styled.span` 
    color: green;
    font-weight: bold;
    
`
const OrderStatus = styled.div`  
    background-color: peachpuff;
    padding: 0px 10px ;
    border-radius: 30px;
    width: fit-content;
    font-size: 13px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    ${mobile({ fontSize: "11px",padding:" 0px 5px"})}
    ${tablet({ fontSize: "11px",padding:" 0px 5px"})}

`

const EmptyData = styled.div` 
    display: flex;
    justify-content: center;
`
const NoData = styled.img`
   width: 40rem;

    
`

const Orders = () => {

    const [orders, setOrders] = useState()
    const userID = useSelector(state => state.user.currentUser._id)

    useEffect(() => {
        const getMyOrders = async () => {
            try {
                const res = await userRequest.get(`/order/single/${userID}`);
                console.log(res.data.data, "dfg")
                setOrders(res.data.data)
            } catch (error) {
                console.error(error)
            }
        }
        getMyOrders();
    }, [userID])
    // console.log(orders?.products,"products")
    return (
        <>
            <Navbar />
            <Announcement />

            <OrderContainer>
                {orders?.length!==0? orders?.map((orderItem, index) => (


                        <OrderBox key={index}>
                            {orderItem?.products?.map((prod, ind) => (
                                <>
                                    <Products key={ind}>
                                        <ImageBox>
                                            <Image src={prod.image} alt="" />
                                        </ImageBox>
                                        <ProductInfo>
                                            <Top>

                                        <OrderDate>{format(orderItem.createdAt)}</OrderDate>
                                        <OrderStatus>{prod.status} </OrderStatus>
                                            </Top>

                                            <OrderTitle>{prod.title}</OrderTitle>
                                            <OrderID>ID: {prod.productID.slice(-6)}</OrderID>
                                            <Price>₹{prod.price}</Price>
                                        </ProductInfo>
                                    </Products>
                                </>
                            ))

                            }
                        </OrderBox>
                        

                ))
                : <EmptyData>
                    <NoData src={emptyOrders} alt="img" />
                </EmptyData>
                }
            </OrderContainer>
            <Newsletter/>
            <Footer/>
        </>
    )
}

export default Orders