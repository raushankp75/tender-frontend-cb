import React, { createContext, useState, useEffect } from 'react'


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('role'));

  const [searchProduct, setSearchProduct] = useState("")


  return (
    <AuthContext.Provider value={{ role, setRole, isLoggedIn, setIsLoggedIn, setSearchProduct, searchProduct }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;