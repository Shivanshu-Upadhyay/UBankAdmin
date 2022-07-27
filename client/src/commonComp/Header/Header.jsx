import React from 'react'
import {Link} from 'react-router-dom'
function Header({title,path}) {
  return (
    <div className="row justify-content-between align-items-center">
    <div className="col-sm-8"><h4 className='headingAll'>{title}</h4></div>
    <div className="col-sm-4 text-end"><Link to={path} className="btn btn-primary">Back</Link> </div>
  </div>
  )
}

export default Header