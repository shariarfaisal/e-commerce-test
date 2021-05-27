import React,{ useState, useContext } from 'react'
import { BaseContext } from '../../contexts/BaseContext'
import FormGroup from './FormGroup'
import { Link } from 'react-router-dom'


const Form = (props) => {
  const { getLogin } = useContext(BaseContext)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [errors,setErrors] = useState('')
  const [success,setSuccess] = useState('')
  const [loading,setLoading] = useState(false)

  const submitHandler = e => {
    e.preventDefault()
    setLoading(true)
    getLogin({
      payloads:{ username, password },
      setSuccess,
      setErrors,
      setLoading
    })
  }

  return(
    <form onSubmit={submitHandler} className="">

      {errors.message && <p className="text-danger text-center" style={{fontSize: '13px'}}>
        {errors.message}
      </p>}
      {success && <p className="text-success text-center" style={{fontSize: '13px'}}>
        <i className="bx bx-check-double"></i>
        {success}
      </p>}

      <FormGroup
        type="text"
        id="username"
        label="Username"
        value={username}
        setvalue={setUsername}
        error={errors.username}
      />
      <FormGroup
        type="password"
        id="password"
        label="Password"
        value={password}
        setvalue={setPassword}
        error={errors.password}
      />
      <div className="mt-3">
        <div style={{fontSize: '1rem'}}>
          <span>Have no account yet? <Link to="/signup">Signup</Link></span>
        </div>
        <button
          disabled={loading || (!username || !password)}
          onClick={submitHandler}
          type="submit"
          className="btn btn-sm round-20 px-3 btn-info d-flex align-items-center mx-auto mt-4">
          <i className="bx bx-log-in mr-2"></i>
          <span>Login</span>
          {loading && <i className="bx bx-loader bx-spin"></i>}
        </button>
      </div>
    </form>
  )
}
export default Form
