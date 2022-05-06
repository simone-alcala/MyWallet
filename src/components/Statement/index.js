import React,{useContext}  from 'react';
import styled from 'styled-components';
import dayjs  from 'dayjs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import UserContext  from '../../contexts/UserContext';

function Statement(props){
  const {_id,description,value,type,date,getIdDeleted} = props;
  const navigate = useNavigate();
  const {userInfo} = useContext(UserContext);
  const showUpdatePage = () => {
    navigate(`/cashinout/update/${type}/${_id}`);
  }

  const deleteStatement = () => {

    let confirmation = window.confirm('Deseja realmente excluir?');

    if (!confirmation) return;

    const URLBASE = 'http://localhost:5000'
    const CONFIG =  { headers: { Token: userInfo.token } };

    const promise = axios.delete(`${URLBASE}/statement/${_id}`, CONFIG);
    
    promise.then((promise) => {
      alert('Registro excluído com sucesso!');
      getIdDeleted(_id);
    });

    promise.catch((err)=>{
      alert('Ocorreu um erro - código ' + err.response.status);
      console.log(err);
    });

  }

  return(   
    <Section key={_id}>
      <Date>{dayjs(date).format('DD/MM')}</Date>
      <Abbr title='Clique para alterar o lançamento'>
        <Description onClick={showUpdatePage}>{description}</Description>
      </Abbr>
      <Value type={type}>{value.toFixed(2).replace('.',',')}</Value>
      <Icon><ion-icon name="close-outline" onClick={deleteStatement}></ion-icon></Icon>
    </Section>
  );
}

const Abbr = styled.abbr`
  text-decoration: none;
`
const Section = styled.section`
  width: calc(var(--width)-2px);
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  color: #000;
  padding: 23px 12px;
  border-radius: 5px;
  font-weight: 400;
  font-size: 16px;
`
const Date = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #C6C6C6;
`
const Description = styled.div`
  width: 130px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #000;
  word-break: break-all;
  cursor: pointer;
`
const Value = styled.div`
  width: 65px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${props => props.type==='I' ? '#03AC00' : '#C70000'};
`
const Icon = styled.div`
  width: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #C6C6C6;
  
  ion-icon{
    cursor: pointer;
  }
`;

export default Statement;