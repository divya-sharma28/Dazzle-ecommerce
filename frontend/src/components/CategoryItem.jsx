import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile ,tablet} from '../responsive'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Container = styled.div`
flex: 1;
margin: 3px;
height: 70vh;
position: relative;
background-color: black; 
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;  /* IMPORTANT */
    opacity: 0.4;
    ${mobile({ height:'25vh'})}
    ${tablet({ height:'25vh' })}


`
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 5px;

`
const Title = styled.h1`
    color: white;
    font-size: 25px;
    text-align: center;

    ${mobile({ fontSize: '20px' })}
    ${tablet({ fontSize: '35px' })}


`
const Button = styled.button`
    border: none ; 
    padding: 8px;
    color: #534747;
    font-weight: 300;
    ${mobile({ padding: '5px', fontSize: '12px'})}
    ${tablet({ padding: '10px', fontSize: '15px'})}
    transition: 0.5s all ease;

    &:hover{
        color: white;
        background-color: #4c0a42;
    }


`
const CategoryItem = ({item}) => {
    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

  return (
    <Container>
        <Image src={item.image}/>
        <Info>
            <Title>{item.title}</Title>
            <Link to={`/products/${item.title.toLowerCase()}`} onClick={scrollToTop}>
            <Button>SHOP NOW</Button>
            </Link>

        </Info> 
    </Container>
  )
}

export default CategoryItem