import React,{useState} from 'react'
import styled from 'styled-components'
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { sliderItems } from '../data';
import { mobile ,tablet} from '../responsive';
import { Link } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 90px);
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({display:"none"})}
    ${tablet({display:"none"})}
`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #f4dae5;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;  
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${(props) => props.direction ==="left" && "10px"};
    right: ${(props) => props.direction ==="right" && "10px"};
    margin: auto;
    cursor: pointer;
    z-index: 2;
`
const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translate(${props=> props.slideIndex * -100}vw);
`
const Slide = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    overflow: hidden;
    background-color: #${props=> props.bg};
`
const ImgContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: end;
    height: 100%;
`
const Image = styled.img`
height: 80%;
mix-blend-mode: multiply;
    
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 30px 90px 30px 0;
`
const Title = styled.h1`
    font-size: 40px;
`
const Desc = styled.p`
    margin: 30px 0px;
    font-weight: 500;
    letter-spacing: 3px;
`
const Button = styled.button`
   padding: 10px;
   font-size: 20px;
   background-color: transparent;
   cursor: pointer;
`
const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0)

    const handleClick=(direction)=>{
        if(direction==='left'){
            setSlideIndex(slideIndex > 0? slideIndex - 1 : 2)
        }
        else{
            setSlideIndex(slideIndex < 2? slideIndex + 1 : 0)
        }
    }
  return (
    <Container>
        <Arrow direction="left" onClick={()=>handleClick('left')}>
            <ArrowLeftOutlinedIcon/>
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
            {
                sliderItems.map((item)=>(
                    <Slide bg={item.bg} key={item.id}>
                    <ImgContainer>
                        <Image src={item.img}/>
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{item.title}</Title>
                        <Desc>{item.desc}</Desc>

                        <Link to='/products'>
                        <Button>SHOP NOW</Button>
                        </Link>
                    </InfoContainer>
                    </Slide>
                ))
            }
      
        </Wrapper>
        <Arrow direction="right" onClick={()=> handleClick('right')}>
            <ArrowRightOutlinedIcon/>
        </Arrow>
    </Container>
  )
}

export default Slider