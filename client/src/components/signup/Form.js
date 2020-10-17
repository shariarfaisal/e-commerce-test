import React,{ useState, useContext }  from 'react'
import { BaseContext } from '../../contexts/BaseContext'

const SignupForm = ({ setIsOpen, setLogin }) => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const [success,setSuccess] = useState('')
  const { getSignup } = useContext(BaseContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const signedup = await getSignup({
      payloads:{ name, email, password, confirmPassword },
      setLoading,
      setError,
      setSuccess
    })
    if(signedup){
      setName('');
      setEmail('');
      setPassword('')
      setConfirmPassword('')
    }
  }

  return(
    <form onSubmit={submitHandler} style={{fontSize: '1.2rem'}}>
      <p className="text-center text-success">{success && success}</p>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="form-control"
          placeholder="Name"
          required={true}
        />
      <small style={{fontSize: '1rem'}} className="text-danger">{error.name && error.name}</small>
      </div>
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
      <div className="form-group">
        <label htmlFor="confirm_password">Confirm Password</label>
        <input
          id="confirm_password"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="form-control"
          placeholder="Confirm Password"
          required={true}
        />
      <small style={{fontSize: '1rem'}} className="text-danger">{error.confirmPassword && error.confirmPassword}</small>
      </div>
      <div className="d-flex align-items-center mt-3">
        <div style={{fontSize: '1rem'}}>
          <span>Already have account?</span>
          <span onClick={e => {setIsOpen(false);setLogin(true)}} className="text-info link">Login</span>
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
          <span>Signup</span>
          {loading && <i className="bx bx-loader bx-spin ml-2"></i>}
        </button>
      </div>
    </form>
  )
}
export default SignupForm
