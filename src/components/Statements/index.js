import { Link,useNavigate } from 'react-router-dom';
import React,{ useState,useContext,useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import {  } from 'react/cjs/react.production.min';

function Statements(){
  
  const {userInfo} = useContext(UserContext);
  const navigate = useNavigate();
  const [statements, setStatements] = useState([]);

  useEffect(() => {

    const URL = 'http://localhost:5000/statement'
    const CONFIG =  { headers: { Token: userInfo.token } };
    const promise = axios.get(URL, CONFIG);
    
    promise.then((promise) => {
      setStatements([...promise.data]);
    });

    promise.catch((err)=>{
      alert('Ocorreu um erro - código ' + err.response.status);
      console.log(err)
    });
  } , userInfo);

  return(
    <Container>
      <Header>Olá, {userInfo.name}</Header>

      <Section>sdfsdf
      </Section>

      <Footer>
        <Button>Nova entrada</Button>
        <Button>Nova saída</Button>
      </Footer>
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
  justify-content: space-between;
`

const Footer = styled.footer`
  width: var(--width);
  height: 130px;
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Section = styled.section`
  width: var(--width);
  height: calc(100vh - 78px - 130px);
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-top: 78px;
  margin-bottom: 130px;
  border-radius: 5px;
`

const Button = styled.button`
  width: 155px;
  height: 114px;
  background-color: var(--button-color);
  color: #fff;
  border-radius: 5px;
  border: none;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
`

export default Statements;