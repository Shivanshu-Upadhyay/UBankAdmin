import React from 'react'
import { Navigate } from "react-router-dom";
function PriveteRoute({children}) {
  return (
    <>
     {  
        localStorage.getItem('admin') && localStorage.getItem('role') ==="2" ? <Navigate to="/login" /> : children
     }
    </>
    
  )
}

export default PriveteRoute