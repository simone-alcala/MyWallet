import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState} from 'react';

import UserContext from './../../contexts/UserContext';

import SignIn     from './../SignIn';
import SignUp     from './../SignUp';
import Statements from './../Statements';
import CashInOut     from './../CashInOut';
import UpdateCashInOut     from './../UpdateCashInOut';



function App(){ 

  const getUserInfo = () => {
    const token = localStorage.getItem('tokenMyWalletSimone');

    if ( token !== undefined && token !== null && token !== '') {
      return { 
        token: localStorage.getItem('tokenMyWalletSimone'), 
        name : localStorage.getItem('nameMyWalletSimone' )
      };
    } else {
      return { token:'', name:'' };
    }
  }

  const [userInfo, setUserInfo] = useState( getUserInfo );

  return(
    <BrowserRouter>
      <UserContext.Provider value={{userInfo, setUserInfo} } >
        <Routes>
          <Route path='/'           element={ <SignIn /> } />
          <Route path='/signup'     element={ <SignUp /> } /> 
          <Route path='/statements' element={ <Statements /> } />               
          <Route path='/cashinout/:type' element={ <CashInOut /> } />  
          <Route path='/cashinout/update/:type/:id' element={ <UpdateCashInOut /> } />  
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
