import styled from "styled-components"
import { mobile, tablet } from "../responsive"
import { useState } from "react"
// import { login } from '../redux/apiCalls'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
// import { loginStart } from "../redux/userRedux"
import {login} from '../redux/actions/userAction'
import { useEffect } from "react"



const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.5),
        rgba(255,255,255,0.5)
        ) ,
        url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    center
    ;
    background-size: cover;

    display: flex;
    align-items: center;
    justify-content: center;
    ;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 35%;
    background-color: white;
    ${mobile({ width: '75%' })}
    ${tablet({ width: '60%' })}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    ${mobile({ fontSize: '18px', textAlign: 'center', fontWeight: 'bold' })}

`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px 10px 5px 0;
    border: none;
    border-bottom: 1px solid ;

    &:focus{
        outline: none;
    }
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-content: center;
    transition: all 0.5s ease;
    background-color: #4c0a42;
    color: white;
    
&:disabled{
  cursor: not-allowed;
  transition: none;
  &:hover{
    color: lightgray;
  }

}
    &:hover{
        background-color: lightgrey;
        color: black;
    }

`
const LinkContainer = styled.div`
display: flex;
justify-content: space-between;
margin-bottom:15px;
${mobile({ flexDirection: 'column', gap: '10px' })}
`

const LinkTag = styled.a`
    font-size: 13px;
    text-decoration: underline;
    color: #4f0080;
    cursor: pointer;
`

const Error = styled.span`
    color: red;
`
const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, currentUser } = useSelector(state => state.user)
  console.log(error,"error")



  const handleLogin = (e) => {
    e.preventDefault();
    // dispatch(loginStart());
    dispatch(login({email, password}))
   
  }


  useEffect(()=>{
    if(currentUser!==null && Object.keys(currentUser).length!==0){
      navigate('/')
    }
  },[currentUser])
  return (
    <Container>
      <Wrapper>
        <Title>LOGIN</Title>
        <Form>
          <Input placeholder="Email" onChange={e => setEmail(e.target.value)} type='email' required />
          <Input placeholder="Password" onChange={e => setPassword(e.target.value)} type="password" required />
          <LinkContainer>
            <Link> <LinkTag>Forgot password?</LinkTag></Link>
            <Link to='/register'> <LinkTag>Create new account?</LinkTag> </Link>
          </LinkContainer>

          <Button onClick={handleLogin} disabled={loading} >LOGIN</Button>
         {error && <Error>{error}</Error>}
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login