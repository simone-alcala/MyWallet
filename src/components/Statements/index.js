import React,{ useState , useContext } from 'react';

import UserContext from '../../contexts/UserContext';

function Statements(){
  
  const {userInfo} = useContext(UserContext);

  return(
    <>
      Olá, {userInfo.name}
      ESTOU NA TELA DE EXTRATO - VOU CONTINUAR DEPOIS
    </>
  );
}

export default Statements;