import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LoginComp } from './LoginComp';
import { RegisterComp } from './RegisterComp';

export const NavComp = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const[bool, setBool]=useState(false)

  return (
    <nav className="container navbar navbar-light ">
      <div className="navbar-brand mb-4 w-100 text-center border" /* onClick={()=>setBool(!bool)} */>
          <h1>nexGym Tienda -- Quiroga</h1>
        </div>
        
        <div className={bool ? 'd-flex flex-column w-100' : 'd-none'}>
          
            {currentUser ? (
              <>
                <div className=" btn-dark mx-2 disabled mb-2 p-2 text-center">
                  {currentUser.email}
                </div>
                <div onClick={() => logout()} className="btn btn-light mx-2">
                  SALIR
                </div> 
              </>
            ) : (
              <>
                <LoginComp />
                <RegisterComp />
              </>
            )}
          
        </div>
    </nav>
  );
};
