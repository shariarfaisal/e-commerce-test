import React,{ useContext } from 'react'
import { Link } from 'react-router-dom'
import Login from '../login/Login'
import Signup from '../signup/Signup'
import { BaseContext } from '../../contexts/BaseContext'
import { ProductContext } from '../../contexts/ProductContext'

const NavItem = ({ link, children }) => (
  <li className="nav-item">
    <Link className="nav-link text-info" to={link}>{ children }</Link>
  </li>
)

const Navbar = (props) => {
  const { setCart, cart, login, setLogin, user, loading, signup, setSignup } = useContext(BaseContext)
  const { cartItems } = useContext(ProductContext)
  return(
    <nav className="navbar navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">E-commerce</Link>
        <ul className="nav">
          <NavItem link="/">Home</NavItem>
          {!user && !loading && <NavItem link="/">
            <span onClick={e => setLogin(true)}>Login</span>
            <Login
              modalIsOpen={login}
              setIsOpen={setLogin}
              setSignup={setSignup}
            />
            <Signup
              modalIsOpen={signup}
              setIsOpen={setSignup}
              setLogin={setLogin}
            />
          </NavItem>}
          {user && <NavItem link={`/profile`}>{user.name}</NavItem>}
          <li className="nav-item">
            <div className="nav-link pointer">
              <i onClick={e => setCart(!cart)} className="bx bx-cart bx-md text-warning"></i>
              <span style={{verticalAlign: 'top'}} className="badge badge-info">{cartItems.length}</span>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default Navbar
