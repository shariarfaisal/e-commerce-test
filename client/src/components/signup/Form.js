import React,{ useState, useContext }  from 'react'
import { BaseContext } from '../../contexts/BaseContext'
import { Link } from 'react-router-dom'


const SignupForm = (props) => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const [success,setSuccess] = useState('')
  const { getSignup } = useContext(BaseContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const signedup = await getSignup({
      payloads:{ username, password, confirmPassword },
      setLoading,
      setError,
      setSuccess,
      clearForm: () => {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
      }
    })
  }

  return(
    <form onSubmit={submitHandler} style={{fontSize: '1.2rem'}}>
      <p className="text-center text-success">{success && success}</p>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="form-control"
          placeholder="Username"
          required={true}
        />
        <small style={{fontSize: '1rem'}} className="text-danger">{error.username && error.username}</small>
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
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="form-control"
          placeholder="Confirm Password"
          required={true}
        />
        <small style={{fontSize: '1rem'}} className="text-danger">{error.confirmPassword && error.confirmPassword}</small>
      </div>
      <div className="mt-3">
        <div style={{fontSize: '1rem'}}>
          <span>Already have account? <Link to="/login">Login</Link></span>
        </div>
        <button
          disabled={loading}
          onClick={submitHandler}
          type="submit"
          className="btn btn-sm round-20 px-3 btn-info d-flex align-items-center mx-auto mt-4">
          <i className="bx bx-log-in mr-2"></i>
          <span>Signup</span>
          {loading && <i className="bx bx-loader bx-spin ml-2"></i>}
        </button>
      </div>
    </form>
  )
}
export default SignupForm
