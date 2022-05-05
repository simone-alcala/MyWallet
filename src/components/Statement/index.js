import React  from 'react';
import styled from 'styled-components';
import dayjs  from 'dayjs';

function Statement(props){
  const {_id,description,value,type,date} = props;

  return(   
    <Section key={_id}>
      <Date>{dayjs(date).format('DD/MM')}</Date>
      <Description>{description}</Description>
      <Value type={type}>{value.toFixed(2).replace('.',',')}</Value>
    </Section>
  );
}

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
  width: 155px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #000;
  word-break: break-all;
`
const Value = styled.div`
  width: 65px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${props => props.type==='I' ? '#03AC00' : '#C70000'};
`

export default Statement;