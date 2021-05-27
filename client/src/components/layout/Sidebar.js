import React,{ useContext } from 'react'
import { Link } from 'react-router-dom'
import { BaseContext } from '../../contexts/BaseContext'

const Sidebar = (props) => {
  const { getLogout } = useContext(BaseContext)
  return(
    <div className="bg-light sidebar">
      <ul className="nav flex-column text-center" style={{marginTop: '10rem'}}>
        <li className="nav-item">
          <Link className="nav-link" to="/">Orders</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/create-promo">Create Promo Code</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/promo-codes">Promo Codes</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <div onClick={getLogout} style={{cursor: 'pointer'}} className="nav-link text-danger" to="/orders"><i className="bx bx-log-out mr-2"></i>Logout</div>
        </li>
      </ul>
    </div>
  )
}
export default Sidebar
