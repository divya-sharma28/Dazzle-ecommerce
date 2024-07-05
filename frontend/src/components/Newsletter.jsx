import React from 'react'
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import { mobile, tablet } from '../responsive';

const Container = styled.div`
    /* height: 60vh; */
    height: fit-content;
    background-color: #ffe8e8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 40px 10px;



`
const Title = styled.h1`
    font-size: 45px;
    margin-bottom: 10px;
    ${mobile({ fontSize: '30px' })}
    ${tablet({ fontSize: '35px' })}



`
const Desc = styled.h5`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile({ textAlign: 'center', fontSize: '20px' })}

`

const InputContainer = styled.div`
       width: 50%;
    height: 40px;
    display: flex;
    justify-content: center;
    ${mobile({ width: '80%' })}

`
const Form = styled.form`
    height: 100%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    ${mobile({ width: '80%' })}
`
const Input = styled.textarea`
    border: none;
    flex: 8;
    padding: 8px 0 0 20px;
    &:focus{
        outline: none;
    }
`
const Button = styled.button`
    flex: 1;
    border: none;
    background-color: #4c0a42;
    color: white;

`

const Newsletter = () => {
    return (
        <Container>
            <Title>NewsLetter</Title>

            <Desc>
                Get timely update from your favourite products.
            </Desc>

            <InputContainer>
                <Form  action="mailto:sharmadivya2332@gmail.com" method="post" enctype="text/plain">
                    <Input placeholder='Your Email' name="message" />
                    <Button>
                        <SendIcon />
                    </Button>
                </Form>

            </InputContainer>
        </Container>
    )
}

export default Newsletter