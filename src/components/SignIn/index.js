import { Link,useNavigate } from 'react-router-dom';
import React,{ useState , useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import UserContext from '../../contexts/UserContext';

function SignIn(){

  const {setUserInfo} = useContext(UserContext);
  const [user, setUser] = useState( {email:'',password:''} );

  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    const URL = 'https://projeto13-my-wallet.herokuapp.com/sign-in'
    const promise = axios.post(URL, { email: user.email, password: user.password });
    
    promise.then((promise) => {
      localStorage.setItem('tokenMyWalletSimone',promise.data.token);
      localStorage.setItem('nameMyWalletSimone' ,promise.data.name );
      setUserInfo ({ 
        token: promise.data.token, 
        name:  promise.data.name });
      navigate('/statements');
    });

    promise.catch((err)=>{
      if (err.response.status === 401) 
        alert('Usuário e/ou senha inválidos!');
      else 
        alert('Ocorreu um erro no login - código ' + err.response.status);
      console.log(err)
    });
  }

  return(
    <Section>
      <Title>MyWallet</Title>
      <Form onSubmit={signIn}>
        <Input type='email' placeholder='E-mail' required value={user.email} 
          onChange={e => setUser ({...user, email: e.target.value })} />
        <Input type='password' placeholder='Senha' required value={user.password} 
          onChange={e => setUser ({...user, password: e.target.value })} />
        <Button type='submit'>Entrar</Button>
      </Form>
      <Link to={'/signup'}><strong>Primeira vez? Cadastre-se!</strong></Link>
    </Section>
  );
}

const Title = styled.header`
  font-family: 'Saira Stencil One', cursive;
  font-size: 32px;
  margin-bottom: 35px;
  color: #fff;
`
const Section = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Button = styled.button`
  width: var(--width);
  height: var(--button-height);
  background-color: var(--button-color);
  color: #fff;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 35px;
  cursor: pointer;
`
const Input = styled.input`
  margin-bottom: 13px;
`

export default SignIn;