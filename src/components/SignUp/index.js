import { Link,useNavigate } from 'react-router-dom';
import React,{ useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function SignUp(){

  const [user, setUser] = useState( {name:'',email:'',password:'',repeat_password:''} );

  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();

    if (user.password !== user.repeat_password){
      alert('As senhas são diferentes!')
      return;
    }

    const URL = 'http://localhost:5000/sign-up'
    const promise = axios.post(URL, { 
      name: user.name, 
      email: user.email, 
      password: user.password,
      repeat_password: user.repeat_password });
    
    promise.then((promise) => {
      alert('Usuário cadastrado com sucesso!');
      navigate('/');
    });

    promise.catch((err)=>{
      if (err.response.status === 409) 
        alert('Email já cadastrado!');
      else 
        alert('Ocorreu um erro no cadastro - código ' + err.response.status);
      console.log(err)
    });
  }

  return(
    <Section>
      <Title>MyWallet</Title>
      <Form onSubmit={signUp}>
        <Input type='text' placeholder='Nome' required value={user.name} 
          onChange={e => setUser ({...user, name: e.target.value })} />
        <Input type='email' placeholder='E-mail' required value={user.email} 
          onChange={e => setUser ({...user, email: e.target.value })} />
        <Input type='password' placeholder='Senha' required value={user.password} 
          onChange={e => setUser ({...user, password: e.target.value })} />
        <Input type='password' placeholder='Confirme a senha' required value={user.repeat_password} 
          onChange={e => setUser ({...user, repeat_password: e.target.value })} />
        <Button type='submit'>Entrar</Button>
      </Form>
      <Link to={'/'}><strong>Já tem uma conta? Entre agora!</strong></Link>
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

export default SignUp;