import React,{ useState, useContext }  from 'react'
import { BaseContext } from '../../contexts/BaseContext'

const LoginForm = ({ setIsOpen, setSignup }) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const { getLogin } = useContext(BaseContext)

  const submitHandler = (e) => {
    e.preventDefault()
    getLogin({
      payloads:{ email, password},
      setLoading,
      setError
    })
  }

  return(
    <form onSubmit={submitHandler} style={{fontSize: '1.2rem'}}>
      <p className="text-center text-danger">{error.message && error.message}</p>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-control"
          placeholder="Email"
          required={true}
        />
        <small style={{fontSize: '1rem'}} className="text-danger">{error.email && error.email}</small>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="form-control"
          placeholder="Password"
          required={true}
        />
        <small style={{fontSize: '1rem'}} className="text-danger">{error.password && error.password}</small>
      </div>
      <div className="d-flex align-items-center mt-3">
        <div style={{fontSize: '1rem'}}>
          <span>Not yet signed up?</span>
          <span onClick={e => {setIsOpen(false);setSignup(true)}} className="text-info link">Signup</span>
        </div>
        <button
          onClick={e => setIsOpen(false)}
          className="btn btn-danger btn-sm mr-2 round-20 px-3 ml-auto"
          type="button">Cancel</button>
        <button
          disabled={loading}
          onClick={submitHandler}
          type="submit"
          className="btn btn-sm round-20 px-3 btn-info d-flex align-items-center">
          <i className="bx bx-log-in mr-2"></i>
          <span>Login</span>
          {loading && <i className="bx bx-loader bx-spin ml-2"></i>}
        </button>
      </div>
    </form>
  )
}
export default LoginForm
