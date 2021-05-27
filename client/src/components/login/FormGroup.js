import React,{ memo } from 'react'

const FormGroup = ({ value, setvalue, label, id, type, error }) => (
  <div className="form-group">
    <label htmlFor="username">{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={e => setvalue(e.target.value)}
      placeholder={label}
      className="form-control"
      required
    />
    <small style={{fontSize: '10px'}} className="text-danger">{error && error}</small>
  </div>
)

export default memo(FormGroup)
