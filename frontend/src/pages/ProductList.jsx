import styled,{css}from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { mobile, tablet, mobileSmall } from '../responsive'
import {useParams} from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Container = styled.div``

const Title = styled.h1`
    margin: 20px;
    ${mobile({margin:'10px 30px 0'})}
    text-transform: capitalize;

`
const FilterContainer = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    ${mobileSmall({flexDirection:'column'})}

`
const Filter = styled.div`
    margin: 20px;
    ${mobile({margin:'0 10px', flex: 1,display:'flex',flexDirection:'column'})}
    ${tablet({margin:'0 10px', flex: 1,display:'flex',flexDirection:'column'})}
    ${props=> props.sort=='sort' && css`${tablet({ alignItems:'end'})}`}

`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({fontSize:'18px',margin:'10px 0 0'})}
    ${tablet({margin:'10px 0 0'})}

`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({width:'100%', margin:'0 0 10px',fontSize: '15px'})}
    ${tablet({width:'70%', margin:'0 0 10px'})}

`
const Option = styled.option``

const ProductList = () => {

    const {category} = useParams()

    

    const [filters, setFilters]= useState({})
    const [sort, setSort]= useState("newest")

    const handleFilters = (e)=>{
        setFilters({
         ...filters,
        [e.target.name]:  e.target.value
        })
    }
    // console.log(filters,sort)
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Title>{category}</Title>
        <FilterContainer>

            <Filter>
                <FilterText>Filter Products</FilterText>
                <Select name='color' onChange={handleFilters}>
                    <Option >Color</Option>
                    <Option>white</Option>
                    <Option>black</Option>
                    <Option>red</Option>
                    <Option>blue</Option>
                    <Option>darkblue</Option>
                    <Option>yellow</Option>
                    <Option>green</Option>
                    <Option>pink</Option>
                    <Option>orange</Option>
                    <Option>peachpuff</Option>
                </Select>
                <Select name='size' onChange={handleFilters}>
                    <Option disabled>Size</Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                </Select>
            </Filter>

            <Filter sort='sort'>
            <FilterText>Sort Products</FilterText>
            <Select onChange={e=> setSort(e.target.value)}>
                    <Option value={"newest"}>Newest</Option>
                    <Option value={"lowToHigh"}>Price (Low to High)</Option>
                    <Option value={"highToLow"}>Price (High to Low)</Option>
                 
                </Select>
            </Filter>

        </FilterContainer>
        <Products cat={category} filters={filters} sort={sort} />
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList