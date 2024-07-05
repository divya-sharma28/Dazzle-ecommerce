import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryItem from './CategoryItem'
import { mobile, tablet } from '../responsive';
import { getProducts } from '../redux/actions/productAction';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { publicRequest } from '../requestMethods'


const GContainer = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    gap: 20px;
    ${mobile({ padding: "0px", flexDirection: "column" })};
    ${tablet({ padding: "0px", flexDirection: "column" })};
  
`
const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({ padding: "0px", flexDirection: "column" })};
    ${tablet({ padding: "0px", flexDirection: "column" })};
  
`
const MenContainer = styled.div`
    height: 150px;
    /* width: 50%; */
    background: linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url("https://cdn.pixabay.com/photo/2021/03/03/06/19/businessman-6064550_1280.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position:  50% 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    transition: all ease 1s;
    &:hover{
        background: linear-gradient(rgba(0,0,0,1),rgba(0,0,0,1)), url("https://cdn.pixabay.com/photo/2021/03/03/06/19/businessman-6064550_1280.jpg");

    }
`
const WomenContainer = styled.div`
     height: 150px;
    /* width: 50%; */
    background: linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url("https://cdn.pixabay.com/photo/2015/07/28/09/18/girl-864107_1280.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position:  50% 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    transition: all ease 1s;
    &:hover{
        background: linear-gradient(rgba(0,0,0,1),rgba(0,0,0,1));

    }
  
`
const Title = styled.h3`
    font-size: 35px;
`

const Categories = () => {

    const [cats, setCats] = useState([])
    console.log(cats,"pro")
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getProducts())

        const getCategories = async () =>{
            const res = await publicRequest.get('category/all')
            try {
                const result = res.data.data
                setCats(result)
            } catch (error) {
                console.error(error)
            }

        }
        getCategories()
    },[])

    return (
        <>
            <GContainer>
                <Link to={`/products/men`} style={{textDecoration:'none', width:"100%"}}>
                <MenContainer>
                <Title>MEN</Title>
              </MenContainer>
                </Link>
                <Link to={`/products/women`} style={{textDecoration:'none', width:"100%"}}>
                <WomenContainer>
                <Title>WOMEN</Title>
              </WomenContainer>
                </Link>
           
            </GContainer>

            <Container>
                {
                    cats.map(item => (
                        <CategoryItem item={item} key={item.id} />
                    ))
                }
            </Container>
        </>

    )
}

export default Categories