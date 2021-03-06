import { useNavigate,useParams } from 'react-router-dom';
import React,{ useState,useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import UserContext  from '../../contexts/UserContext';

function CashInOut (){

  const {type} = useParams();

  const {userInfo} = useContext(UserContext);
  const [statement, setStatement] = useState({description: '', value: '', type: type});

  const navigate = useNavigate();

  const validateNumber = (value) => {
    value = parseInt(value.replace(/[\D]+/g, ''));   
    value = value.toString().replace(/([0-9]{2})$/g, ",$1");
    if(value === 'NaN') return  '';
    return value.replace(/([0-9]),([0-9]{2}$)/g, "$1,$2");
  }

  const sendData = (e) => {

    e.preventDefault();

    const URLBASE = 'https://projeto13-my-wallet.herokuapp.com'
    const CONFIG =  { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const BODY = { 
      description: statement.description,
      type: statement.type,
      value: parseFloat(statement.value.replace(',','.'))
    };

    const promise = axios.post(`${URLBASE}/statement`, BODY, CONFIG);
    
    promise.then((promise) => {
      alert('Registro salvo com sucesso!');
      navigate('/statements');
    });

    promise.catch((err)=>{
      alert('Ocorreu um erro - código ' + err.response.status);
      console.log(err);
    });

  }

  return(

    <Container>
      
      <Header>Nova {type === 'I' ? 'entrada' : 'saída'}</Header>

      <Form onSubmit={sendData}>

        <Input type='text' maxLength={8} placeholder='Valor' required value={statement.value} 
          onChange={e => setStatement ({...statement, value: validateNumber(e.target.value) })} />

        <Input type='text' maxLength={26} placeholder='Descrição' required value={statement.description} 
          onChange={e => setStatement ({...statement, description: e.target.value })} />

        <Button type='submit'>Salvar {type === 'I' ? 'entrada' : 'saída'}</Button>

      </Form>

    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled.header`
  width: var(--width);
  height: 78px;
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
`

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 78px;
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

export default CashInOut;