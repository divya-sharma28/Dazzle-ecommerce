import styled from "styled-components"
import { mobile, tablet } from "../responsive"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
// import { register } from "../redux/apiCalls"
import { register } from '../redux/actions/userAction'
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react"

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.5),
        rgba(255,255,255,0.5)
        ) ,
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    center;
    /* background-size: cover; */
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({ padding: '20px 0' })}

    ;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 50%;
    background-color: white;
    ${mobile({ width: '80%' })}
    ${tablet({ width: '80%' })}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    ${mobile({ fontSize: '18px', textAlign: 'center', fontWeight: 'bold' })}

`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    ${mobile({ flexDirection: 'column' })}

`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0 0;
    padding: 10px 10px 5px 0;
    border: none;
    border-bottom: 1px solid ;
    ${mobile({ width: '85%', margin: '5px auto', paddingBottom: '0px', fontSize: '15px' })}


    &:focus{
        outline: none;
    }
`
const Agreement = styled.span`
    font-size: 12px;
    margin: 5px 0 20px;
    ${mobile({ margin: '8px 0' })}

`
const ErrorMessage = styled.span`
    color:red;

`

const LinkContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;
`
const LinkTag = styled.a`
    font-size: 13px;
    text-decoration: underline;
    color: #4f0080;
    cursor: pointer;

`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    display: flex;
    justify-content: center;
    align-content: center;
    transition: all 0.5s ease;
    background-color: #4c0a42;
    color: white;

    ${mobile({ padding: '10px', margin: 'auto' })}
    ${tablet({ padding: '10px' })}

    &:hover{
        background-color: lightgrey;
        color: black;
    }

`

const Register = () => {

    const [userData, setUserData] = useState({})
    const [errorData, setErrorData] = useState('');

    // const [errorData, setErrorData] = useState('');
    const { error, registeredUser } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const notify = () => toast.success("Registered Successfully");

    const changeHandler = (e) => {
        setUserData(prev => (
            { ...prev, [e.target.name]: e.target.value }
        ))
    }
 
    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            setErrorData(''); // Clear any previous errors
            const message = await register(userData);

            if (message) {
                setErrorData(message)
            }
            else { 
                notify()
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }

        } catch (error) {
            // Handle other errors if needed
        }

    }
    // const handleRegister = async (e) => {
    //     e.preventDefault();

    //     try {
    //          dispatch(register(userData));
             
    //          if (registeredUser.email === userData.email) {
    //             notify();
    //             setTimeout(() => {
    //                 navigate('/login');
    //             }, 3000);
    //         }
         
            
    //     } catch (error) {
    //         console.log("An error occurred during registration:", error);
    //     }
    // };

   



   





    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="Full Name" type="text" name="name" onChange={changeHandler} required />
                    <Input placeholder="Email" type="email" name="email" onChange={changeHandler} required />
                    <Input placeholder="Password" type="password" name="password" onChange={changeHandler} required />
                    <Input placeholder="Confirm Password" type="password" name="confirm_password" onChange={changeHandler} required />
                    <LinkContainer>
                        <ErrorMessage>{errorData && errorData}</ErrorMessage>
                        <Link to='/login'>
                            <LinkTag>Already a user?</LinkTag>
                        </Link>


                    </LinkContainer>

                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button onClick={handleRegister}>CREATE</Button>
                </Form>
            </Wrapper>
            <ToastContainer position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
        </Container>
    )
}

export default Register