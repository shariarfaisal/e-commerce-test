import React,{ useState, useContext } from 'react'
import { ProductContext } from '../../contexts/ProductContext'

const Promo = (props) => {
  const { promo, promoCodeApply } = useContext(ProductContext)
  const [promoCode,setPromoCode] = useState(promo?promo.code: '')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    promoCodeApply({
      payloads:{ promoCode },
      setError,
      setLoading
    })
  }

  return (
    <div className="px-3 py-3">
      <div className="d-flex">
        <input
          className="round-20 w-75 form-control mx-2"
          type="text"
          value={promoCode}
          onChange={e => setPromoCode(e.target.value)}
          placeholder="Promo Code"
        />
      <button
        onClick={submitHandler}
        disabled={loading || (promo && promo.code === promoCode)}
        className="round-20 btn btn-warning w-25"
        type="button">
        <span>apply</span>
        {loading && <i className="bx bx-loader bx-spin ml-2"></i>}
      </button>
      </div>
      {<small style={{fontSize: '.9rem'}} className="text-danger d-block pl-3">{error.promoCode && error.promoCode}</small>}
    </div>
  )
}
export default Promo
