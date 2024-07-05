import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 30px;
    background-color: #4c0a42;
    color: white;
    display: flex;
    justify-content: center;
    font-weight: 500;
    align-items: center;

`
const Announcement = () => {
  return (
    <div>
        <Container>Free Shipping on orders over ₹499</Container>
    </div>
  )
}

export default Announcement 