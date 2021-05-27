import React from 'react'

const FormGroup = ({ label, id, value, setValue, type, error, className, required }) => {
  return(
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        style={{borderRadius: '20px'}}
        type={type}
        value={value}
        onChange={e => setValue(e.target.value)}
        className="form-control"
        placeholder={label}
        required={required}
      />
      <small className="text-danger">{error && error}</small>
    </div>
  )
}

export default FormGroup
