import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { mobile, tablet } from "../responsive"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { publicRequest } from "../requestMethods"
// import { addToCart } from "../redux/cartRedux"
import { useSelector, useDispatch } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { addCartData } from "../redux/apiCalls"
import { addtocart } from "../redux/actions/cartAction"



const Container = styled.div``

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: '10px', flexDirection: "column" })}
`
const ImgContainer = styled.div`
    flex: 1; 
`
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: contain;
    ${mobile({ height: '40vh' })}

`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;
    ${mobile({ padding: '10px' })}

`
const Title = styled.h1`

`
const Desc = styled.p`
    margin: 20px 0;
`
const Price = styled.span`
    font-weight: 800;
    font-size: 25px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: 30px 0;
    ${mobile({ width: '100%' })}
    ${tablet({ width: '100%' })}

    
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0 5px;
    cursor: pointer;
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: '100%' })}
    ${tablet({ width: '100%' })}


`;
const QuantityContainer = styled.div`
    display: flex;
    align-items: center;
`;
const Quantity = styled.span`
    font-weight: 800;
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid #4c0a42;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`;
const Button = styled.button`
    border: 2px solid #4c0a42;
    background-color: #4c0a42;
    color: white;
    padding: 10px 15px;
    ${mobile({ padding: '5px' })}


    &:hover{
        background-color: white;
        color: black;

    }
`;


const SingleProduct = () => {

    const notify = () => toast.success("Added to cart");
    const notifyMatch = () => toast.warning("Already in cart");
    const notifyLog = () => toast.error("Login required!");

    const { prodID } = useParams();
    const dispath = useDispatch();
    const navigate = useNavigate();

    const cartProducts = useSelector(state => state.cart.cartItems)
    // const userID = useSelector(state => state.user.currentUser._id)
    const userID = JSON.parse(localStorage.getItem('currentUser'))?._id

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)

    // const defaultColor = product&& product.color[0] || ''
    // const defaultSize = product &&  product.size[0] || ''

    const [color, setColor] = useState('')
    const [size, setSize] = useState('')



    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get(`/product/single/${prodID}`)
                setProduct(res.data.data);
                setColor(res.data.data.color[0])
                setSize(res.data.data.size[0])
            } catch (error) {
                console.error(error)
            }
        }
        getProduct()
    }, [prodID])
    // console.log(product)

    const handleQuantity = (q) => {

        if (q === 'dec') {
            quantity > 1 && setQuantity(quantity - 1)
        }
        else {
            setQuantity(quantity + 1)
        }
    }


    const payload = {
        userID: userID,
        productID: prodID,
        title: product.title,
        image: product.image,
        quantity: quantity,
        color: color,
        size : size,
        price: product.price*quantity



    }
    const existID = cartProducts.find(item => item.productID === prodID)
    const existColor = cartProducts.find(item => item.color === color)
    const existSize = cartProducts.find(item => item.size === size)
    const handleCart = async () => {
     
        if(!userID){
            setTimeout(()=>{
               navigate('/login') 
            },2000)
            notifyLog()
        }
        else{
            if (existID && existColor && existSize) {
                notifyMatch()
            }
    
            else {
                dispath(addtocart(payload))
                // dispath(addtocart({ payload, quantity, size, color }))
                notify()
            }
        }

    

    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.image} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>₹{product.price}</Price>

                    <FilterContainer>
                        <Filter>
                            <FilterTitle>color:</FilterTitle>
                            {product.color?.map(col => (
                                <FilterColor color={col} key={col} onClick={() => setColor(col)}></FilterColor>
                            ))}

                        </Filter>

                        <Filter>
                            <FilterTitle>Size:</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                <FilterSizeOption disabled>size</FilterSizeOption>
                                {product.size?.map((s, index) => (
                                    <FilterSizeOption key={s} defaultValue={index === 0}>{s}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>

                    <AddContainer>

                        <QuantityContainer>

                            <RemoveIcon onClick={() => handleQuantity('dec')} style={{ cursor: 'pointer' }} />

                            <Quantity>{quantity}</Quantity>

                            <AddIcon onClick={() => handleQuantity('inc')} style={{ cursor: 'pointer' }} />

                        </QuantityContainer>

                        <Button onClick={handleCart}>ADD TO CART</Button>

                    </AddContainer>
                </InfoContainer>
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
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default SingleProduct