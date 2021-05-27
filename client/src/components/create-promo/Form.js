import React,{ useState, useContext } from 'react'
import SwitchBtn from './SwitchBtn'
import FormGroup from './FormGroup'
import { PromoCodeContext } from '../../contexts/PromoCodeContext'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = (props) => {
  const [active,setActive] = useState(false)
  const [code,setCode] = useState('')
  const [maxUse,setMaxUse] = useState('')
  const [discount,setDiscount] = useState(0)
  const [deadline,setDeadline] = useState(new Date())
  const { createPromoCode } = useContext(PromoCodeContext)
  const [success,setSuccess] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)

  const submitHandler = async e => {
    e.preventDefault()
    const created = await createPromoCode({
      payloads:{ code, maxUse, discount, deadline, active },
      setError,
      setSuccess,
      setLoading
    })
    if(created){
      setActive(false);
      setCode('')
      setMaxUse('')
      setDiscount(0)
      setDeadline(new Date())
      setError('')
    }
  }

  return(
    <form onSubmit={submitHandler} className="bg-light col-sm-8 col-md-6 shadow p-4" style={{minHeight: '25rem'}}>
      <h2 className="my-4 text-center">Create Promo Code</h2>
      <small style={{fontSize: '1rem'}} className="text-success text-center d-block">{success && success}</small>
      <FormGroup
        label="Code"
        id="code"
        type="text"
        value={code}
        setValue={setCode}
        className="form-group"
        error={error.code}
        required={true}
      />


      <div className="row">
        <FormGroup
          label="Max use limit"
          id="max-limit"
          type="text"
          value={maxUse}
          setValue={setMaxUse}
          className="form-group col-6"
          error={error.maxUse}
          required={false}
        />
        <FormGroup
          label="Discount"
          id="discount"
          type="number"
          value={discount}
          setValue={setDiscount}
          className="form-group col-6"
          error={error.discount}
          required={true}
        />
      </div>
      <div className="py-2 mb-2">
        <label htmlFor="deadline">Deadline</label>
        <DatePicker id="deadline" className="form-control" selected={deadline} onChange={e => setDeadline(e)} />
      </div>
      <SwitchBtn
        setPublished={setActive}
        published={active}
      />
      <div className="text-center">
        <button
          disabled={loading}
          style={{borderRadius: '20px'}}
          className="btn btn-warning px-4"
          type="submit">
            <span>Submit</span>
            {loading && <i className="bx bx-loader bx-spin ml-2 text-light"></i>}
        </button>
      </div>
    </form>
  )
}
export default Form