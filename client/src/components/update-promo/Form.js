import React,{ useState, useContext } from 'react'
import SwitchBtn from '../create-promo/SwitchBtn'
import FormGroup from '../create-promo/FormGroup'
import { PromoCodeContext } from '../../contexts/PromoCodeContext'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = (props) => {
  const [active,setActive] = useState(props.active)
  const [code,setCode] = useState(props.code)
  const [maxUse,setMaxUse] = useState(props.maxUse)
  const [discount,setDiscount] = useState(props.discount)
  const [deadline,setDeadline] = useState(new Date(props.deadline))
  const { updatePromoCode } = useContext(PromoCodeContext)
  const [success,setSuccess] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)

  const submitHandler = e => {
    e.preventDefault()
    updatePromoCode({
      _id: props._id,
      payloads:{ code, maxUse, discount, deadline, active },
      setError,
      setSuccess,
      setLoading,
      setData: props.setData
    })
  }

  return(
    <form onSubmit={submitHandler} className="bg-light col-sm-8 col-md-6 shadow p-4" style={{minHeight: '25rem'}}>
      <h2 className="my-4 text-center">Update Promo Code</h2>
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
            <span>Update</span>
            {loading && <i className="bx bx-loader bx-spin ml-2 text-light"></i>}
        </button>
      </div>
    </form>
  )
}
export default Form
