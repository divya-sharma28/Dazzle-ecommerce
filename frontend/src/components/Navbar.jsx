import styled from 'styled-components'
import Search from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { mobileSmall, mobile, mobileMedium, mobileLarge, tablet } from '../responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { logout } from '../redux/userRedux';
import { logout } from '../redux/reducers/userReducer';
import { useState } from 'react';
// import { searchProduct } from '../redux/productRedux';
import { searchProduct } from '../redux/reducers/productReducer';
import { useEffect } from 'react';
import { getwishByUser } from '../redux/actions/wishAction';
import {getcart} from '../redux/actions/cartAction';

const Container = styled.div`
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: white;
    ${mobile({ position: "unset" })}
    ${tablet({ position: "unset" })}

`;
const Wrapper = styled.div`
    padding: 10px 20px ;
    display: flex;
    justify-content: space-between;
    align-items:center;
    ${mobile({ padding: "10px 15px 10px 10px" })}
`

const Left = styled.div`
    flex:1;
    display: flex;
    align-items:center;
    ${mobileSmall({ flex: 1 })}
    ${mobileMedium({ flex: 1.5 })}
    ${mobileLarge({ flex: 0.8 })}
    ${tablet({ flex: 0.5 })}
`;

const SearchContainer = styled.div`
    border: 0.5px solid gray;
    display: flex;
    align-items:center;
    padding:5px;
    /* margin-left: 25px;  */
    background-color: white;
    ${mobile({ marginLeft: "10px" })}
    ${tablet({ marginLeft: "0" })}
`

const Input = styled.input`
    border:none;
    width: 100%;
    ${mobileSmall({ fontSize: '14px' })}
    ${mobileMedium({ fontSize: '15px' })}
    ${mobileMedium({ fontSize: '15px' })} 


    &:focus{
        outline: none;
    }

    &::placeholder{
        ${mobile({ fontSize: "14px" })}

    }
`
const Center = styled.div`
    flex:1;
    text-align: center;
    ${mobile({ textAlign: "end", flex:2 })}
`

const Logo = styled.h1`
    font-weight: 400;
    margin: 0;
    ${mobile({ fontSize: "22px" })};
    ${mobileSmall({ fontSize: "18px" })};
    color: black;
`
const Right = styled.div` 
    flex:1;
    display:flex;
    align-items:center;
    justify-content: flex-end;
    ${mobileSmall({ flex: 3.5, justifyContent: "end" })}
    ${mobileMedium({ flex: 3, justifyContent: "end" })}
    ${mobileLarge({ flex: 2, justifyContent: "center" })}
`



const MenuItem = styled.div`
    font-size: 16px;
    cursor: pointer;
    margin-left: 25px; 
    ${mobile({ fontSize: "15px", marginLeft: "10px" })}
`

const Navbar = () => {

    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.user.currentUser)
    const search = useSelector(state => state.product.searched)
    const wish = useSelector(state => state.wish.list)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log(user)

    const [searchData, setSearchData] = useState('')

    const searchHandler = (e) => {
        setSearchData(e.target.value)
    }

    const handleEnter = (e) => {

        if (e.key === 'Enter') {
            navigate('/products')
            dispatch(searchProduct(searchData))
        }
    }


    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Logo>Dazzle</Logo>
                    </Link>
                </Left>

                <Center>
                    <SearchContainer>
                        <Input placeholder='Search' onChange={searchHandler} defaultValue={search} onKeyDown={handleEnter} />
                        <Search style={{ color: "gray", fontSize: 18 }} />
                    </SearchContainer>
                </Center>

                <Right>
                    { user!==null && Object.keys(user).length!==0?
                        <>
                            <Link  to='/wishlist' style={{textDecoration:'none', color:'unset'}}>
                                <MenuItem> <FavoriteRoundedIcon style={{fontSize:'20px',margin:'0 2px 2px'}} />{wish.length}</MenuItem>
                            </Link>
                            <MenuItem onClick={() => dispatch(logout())}>LOGOUT</MenuItem>
                        </>
                        :
                        <>
                            <Link to='/register'  style={{textDecoration:'none', color:'unset'}}>
                                <MenuItem>REGISTER</MenuItem>
                            </Link>

                            <Link to='/login'  style={{textDecoration:'none', color:'unset'}}>
                                <MenuItem>LOGIN</MenuItem>
                            </Link>
                        </>
                    }

                    <MenuItem>

                        <Link to={user!==null && Object.keys(user).length!==0 ? '/cart' : '/login'}>
                            <Badge badgeContent={cart.cartItems.length} color="secondary">
                                <LocalMallIcon color="action" />
                            </Badge>
                        </Link>

                    </MenuItem>

                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar