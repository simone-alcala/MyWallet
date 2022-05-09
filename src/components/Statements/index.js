import { Link, useNavigate } from 'react-router-dom';
import React,{ useState,useContext,useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import UserContext  from '../../contexts/UserContext';
import Statement    from '../Statement'; 

function Statements(){
  
  const {userInfo, setUserInfo} = useContext(UserContext);
  const [statements, setStatements] = useState([]);
  const [balance, setBalance] = useState(0);
  const [idDeleted, setIdDeleted] = useState('');

  const navigate = useNavigate();
  
  const getIdDeleted = (value) => {
    setIdDeleted(value);
  }

  const logout = () => {
      localStorage.setItem('tokenMyWalletSimone','');
      localStorage.setItem('nameMyWalletSimone' ,'' );
      setUserInfo ({ 
        token: '', 
        name:  '' });
      navigate('/');
  }

  useEffect(() => {

    const URLBASE = 'https://projeto13-my-wallet.herokuapp.com'
    const CONFIG =  { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const promise = axios.get(`${URLBASE}/statement`, CONFIG);
    
    
    promise.then((promise) => {
      setStatements([...promise.data]);
    });

    promise.catch((err)=>{
      alert('Ocorreu um erro - código ' + err.response.status);
      console.log(err)
    });

    const promiseBalance = axios.get(`${URLBASE}/balance`, CONFIG);
    
    promiseBalance.then((promise) => {
      setBalance(promise.data.balance);
    });

    promiseBalance.catch((err)=>{
      alert('Ocorreu um erro ao carregar saldo - código ' + err.response.status);
      console.log(err)
    });

  } , [userInfo,idDeleted]);

  return(
    <Container>

      <Header>
        Olá, {userInfo.name}
        <ion-icon name="log-out-outline" onClick={logout} ></ion-icon>
      </Header>

      {statements.length === 0 ?       
        
        <NoStatement> <Span>Não há registros de <br/> entrada ou saída</Span> </NoStatement> :
        <>
          <Section>
            {statements.map(({_id, description, value, type, date},index) =>
            <Statement key={index} _id={_id} description={description} value={value} type={type} date={date} getIdDeleted={getIdDeleted}/> )}
          </Section>
          <Balance><strong>SALDO</strong>{balance.toFixed(2).replace('.', ',')}</Balance>
        </> 
      }  
      <Footer>
        <Link to={'/cashinout/I'}> 
          <Button><ion-icon name="add-circle-outline"></ion-icon><span>Nova <br/>entrada</span></Button>
        </Link>
        <Link to={'/cashinout/O'}> 
          <Button><ion-icon name="remove-circle-outline"></ion-icon><span>Nova <br/>saída</span></Button>
        </Link>
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
  text-transform: capitalize;
  
  ion-icon{
    cursor: pointer;
  }
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
  height: calc(100vh - 78px - 130px - 50px);
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: #000;
  margin-top: 78px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  overflow-y: auto;
`

const Balance = styled.div`
  width: var(--width);
  height: 30px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #03AC00;
  font-size: 17px;
  padding: 23px 12px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  strong{
    color: #000;
  }
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
  position: relative;

  span{
    position: absolute;
    bottom: 10px;
    left: 10px;
    text-align: left;
  }

  ion-icon{
    --ionicon-stroke-width: 60px;
    font-size: 20px;
    position: absolute;
    top: 10px;
    left: 10px;
  }
`

const NoStatement = styled.section`
  width: var(--width);
  height: calc(100vh - 78px - 130px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 78px;
`

const Span = styled.span`
  color: #868686;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
`

export default Statements;