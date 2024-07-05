// react hooks
import { useEffect, useState } from 'react'
// components
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import CartItem from '../components/CartItem'
// redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { checkout } from '../redux/actions/cartAction'
import { getcart } from '../redux/actions/cartAction'
// routing
import { Link } from 'react-router-dom'
// image
import emptyCart from '../assets/EmptyData/empty_cart.png'
// style
import styled, { css } from 'styled-components'
// responsive
import { mobile, tablet } from '../responsive';



const Container = styled.div``

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
`
const Title = styled.h1`
  text-align: center;
`
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ padding: '5px' })}

`
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600 ;
  cursor: pointer;
  border: 2px solid #4c0a42;
  background-color: ${(props) => props.type === 'filled' ? '#4c0a42' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};

  ${mobile({ padding: '5px', fontSize: "14px" })}

 ${(props) => props.type === 'filled' ? css`&:hover{
    background-color:white;
    color: black;

  } `: css`&:hover{
    background-color: #4c0a42;
    color: white
}
 `
  }
`


const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
  

`
const Info = styled.div`
  flex: 3;
`


const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgrey;
  padding: 20px;
  height: 17rem;
  position: sticky;
  top: 10%;
  ${mobile({ margin: '20px 0 0' })}

`
const SummaryTitle = styled.h1`
  font-size: 25px;
  font-weight: 200;
  text-align: center;

`
const SummaryItem = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};


`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const SummaryButton = styled.button`
width: 100%;
  padding: 10px;
  background-color: #1b1a1a;
  color: white;
  font-weight: 600;
  border: none;

  &:hover{
    background-color: #0a4c28;
  }
`
const EmptyData = styled.div` 
    display: flex;
    justify-content: center;
`
const NoData = styled.img`
   width: 38rem;
`

const Cart = () => {


  const userID = JSON.parse(localStorage.getItem('currentUser'))._id
  const { cartItems, cartTotal } = useSelector(state => state.cart)
  const {loading}  = useSelector(state => state.wish)

  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getcart(userID))
  }, [userID])


  const payload = {
    ...cartItems,
  userID,
    cartTotal
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>{cartItems.length!==0 && "MY BAG"}</Title>
        <Top>
          <Link to='/products'>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>

          <Link to={'/orders'}>
          
          <TopButton type='filled'>MY ORDERS</TopButton>
          </Link>
        </Top>
        {<Bottom>
          
          <Info>
            {cartItems.length!==0?


              cartItems.map((val, index) => (

                <CartItem item={val} key={index} />

              )):
                      <EmptyData>
        <NoData src={emptyCart} alt="img" />
        </EmptyData>
            }


          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {cartTotal}</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 199</SummaryItemPrice>
            </SummaryItem>


            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>- ₹ 199</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type='total'>
              <SummaryItemText > Total</SummaryItemText>
              <SummaryItemPrice>₹ {cartTotal}</SummaryItemPrice>
            </SummaryItem>

            <SummaryButton onClick={() => dispatch(checkout(payload)) }>ORDER NOW</SummaryButton>

          </Summary>
        </Bottom>

        }
      </Wrapper>
    </Container>
  )
}

export default Cart