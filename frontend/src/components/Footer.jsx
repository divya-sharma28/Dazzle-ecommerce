import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { mobile, tablet } from '../responsive';
import { Link } from 'react-router-dom';
const Container = styled.div`
    display: flex;
    ${mobile({flexDirection:'column'})}
    ${tablet({paddingBottom:'15px'})}
`
const Left = styled.div`
    flex: 1.5;
    padding: 20px;
    display: flex;
    flex-direction: column;
`
const Logo = styled.h1``
const Desc = styled.p`
    margin: 10px 0 20px;
`
const SocialContainer = styled.div`
    display: flex;
    ;
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`

const Center = styled.div`
    flex:1;
    padding: 20px;
    ${mobile({display:'none'})}
    ${tablet({display:'none'})}
    
`

const Title = styled.h3`
    margin-bottom: 30px;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`


const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({backgroundColor:'#eee', padding:'30px 30px 40px'})}

`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    
`

const PaymentImage = styled.img`
    width: 50%;
`
const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    return (
        <Container>
            <Left>
                <Logo>Dazzle</Logo>
                <Desc>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                </Desc>
                <SocialContainer>
                    <SocialIcon color='3B5999'>
                        <FacebookIcon />
                    </SocialIcon>
                    <SocialIcon color='E4405F'>
                        <InstagramIcon />
                    </SocialIcon>
                    <SocialIcon color='55ACEE'>
                        <TwitterIcon />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem><Link to={'/'} style={{textDecoration: 'none', color:'black'}} onClick={scrollToTop}>Home</Link></ListItem>
                    <ListItem><Link to={'/cart'} style={{textDecoration: 'none', color:'black'}} onClick={scrollToTop}>Cart</Link></ListItem>
                    <ListItem><Link to={'/products/men'} style={{textDecoration: 'none', color:'black'}} onClick={scrollToTop}>Men's Fashion</Link></ListItem>
                    <ListItem><Link to={'/products/women'} style={{textDecoration: 'none', color:'black'}} onClick={scrollToTop}>Women's Fashion</Link></ListItem>
                    <ListItem><Link to={'/products/shoes'} style={{textDecoration: 'none', color:'black'}} onClick={scrollToTop}>Accessories</Link></ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem><Link to={'/wishlist'} style={{textDecoration: 'none', color:'black'}} onClick={scrollToTop}>Wishlist</Link></ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                  <LocationOnIcon style={{marginRight:"10px"}}/>  Borivali(W), Mumbai 400092
                </ContactItem>
                <ContactItem>
                   <PhoneIcon style={{marginRight:"10px"}}/> +91 99999 99999
                </ContactItem>
                <ContactItem>
                   <EmailIcon style={{marginRight:"10px"}}/> abc@email.com
                </ContactItem>
                <PaymentImage src="https://i.ibb.co/Qfvn4z6/payment.png" />

            </Right>

        </Container>
    )
}

export default Footer