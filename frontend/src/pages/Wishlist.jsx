import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
// import Search from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
// import { deleteWish } from '../redux/wishlistRedux';
import { deletewish } from '../redux/actions/wishAction';
import { getwishByUser } from '../redux/actions/wishAction';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import emptyWish from '../assets/EmptyData/empty_wish.png'
import VisibilityIcon from '@mui/icons-material/Visibility';



const MainContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 15px;

  `
const MainTitle = styled.h3`
    display: flex;
    justify-content: center;
    margin: 20px 0;


  `
const Container = styled.div`
    flex:1;
    margin: 5px;
    min-width: 200px;
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

const EmptyData = styled.div` 
    display: flex;
    justify-content: center;
`
const NoData = styled.img`
   width: 40rem;
`
const Wishlist = () => {


    const wish = useSelector(state => state.wish.list)
    const userID = JSON.parse(localStorage.getItem('currentUser'))._id

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getwishByUser(userID))
    }, [userID])

    const deleteHandler = (item) => {
        // console.log(item.wish._id)
        dispatch(deletewish(item._id))
    }
    console.log(wish)
    return (
        <>
            <Navbar />
            <Announcement />
            { wish.length!==0? <>
                <MainTitle>My Wishlist</MainTitle>
            <MainContainer>
                {
                    
                    wish.map((item, index) => (
                        <Container key={index}>
                            {/* {console.log(item, "in jsx")} */}
                            <PriceBox>
                                <Symbol>₹</Symbol>
                                <Price>{item.price}</Price> {/*change model*/}
                            </PriceBox>
                            <Circle>
                                <Image src={item.image} />
                            </Circle>
                            <Info>
                                <Tooltip id="my-tooltip" />

                                <Icon data-tooltip-id="my-tooltip" data-tooltip-content="View">
                                    <Link to={`/product/${item.prodID}`}>
                                        <VisibilityIcon/>
                                    </Link>
                                </Icon>

                                <Icon data-tooltip-id="my-tooltip" data-tooltip-content="Delete" onClick={() => deleteHandler(item)}>
                                    <DeleteIcon />
                                </Icon>
                            </Info>
                        </Container>

                    ))
                }

            </MainContainer>
             </> : <EmptyData>
                    <NoData src={emptyWish} alt="img" />
                </EmptyData>

            }
            <Newsletter/>

            <Footer/>
            

        </>
    )
}


export default Wishlist