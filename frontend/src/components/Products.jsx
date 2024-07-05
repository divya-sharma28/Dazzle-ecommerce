import { useState, useEffect } from 'react'
import styled from 'styled-components'
import ProductItem from './ProductItem'
import { mobile } from '../responsive'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
// import { searchProduct } from '../redux/productRedux'


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    ${mobile({ padding: "10px" })}
`

const Products = ({ cat, sort, filters }) => {

  const search= useSelector(state=> state.product.searched)
  // console.log(search,"fde")

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([])

  const filterSearch = products.filter(item=> item.title.toLowerCase().includes(search.toLowerCase()))
  // console.log(filterSearch,"filterSearch")


  const dispatch = useDispatch()
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(cat ? `http://localhost:4000/dazzle/product/all?category=${cat}` : "http://localhost:4000/dazzle/product/all");
        setProducts(res.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    getProducts();
  }, [cat])




  useEffect(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered?.filter(item =>
        item?.title?.toLowerCase().includes(search?.toLowerCase())
      );
    }

    if (filters && Object.keys(filters).length > 0) {
      filtered = filtered.filter(item =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      );
    }

    if (sort === 'newest') {
      filtered.sort((a, b) => a.createdAt - b.createdAt);
    } else if (sort === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);

  }, [products, search, filters, sort]);

  return (
    <Container>
      {filteredProducts.map((item, index) => (
        <ProductItem item={item} key={index} />
      ))}
    </Container>
  )
}

export default Products