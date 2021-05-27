import React from 'react'
import { Link } from 'react-router-dom'


const PromoCodesItem = ({ _id, code, discount, maxUse, used, active, deadline }) => {
  const dateFormater = (date) => {
    const t = new Date(date)
    return `${t.getDate()+1}-${t.getMonth()}-${t.getFullYear()}`
  }

  return(
    <div className="list-group-item list-group-item-action">
        <div style={{width: "25%"}}>{code}</div>
        <div style={{width: "12%"}}>{discount}%</div>
        <div style={{width: "12%"}}>{maxUse? maxUse : '- - - -'}</div>
        <div style={{width: "12%"}}>{used}</div>
        <div style={{width: "12%"}}>{active? 'yes': 'no'}</div>
        <div style={{width: "15%"}}>{deadline?dateFormater(deadline): '- - - -'}</div>
        <Link to={`/promo-codes/${_id}`} className="text-center text-warning pointer" style={{width: '12%'}}>
          <i className="bx bx-edit"></i>
        </Link>
    </div>
  )
}
export default PromoCodesItem
