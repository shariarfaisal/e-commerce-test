import React from 'react'

const Discount = ({ discount, totalPrice }) => {
  return (
    <div className="p-3 d-flex justify-content-between">
      <div style={{fontSize: '1.2rem'}}>Discount <span  className="text-muted" style={{fontSize: '1rem'}}>(Eid2020)</span></div>
      <div style={{fontSize: '1rem'}}>${totalPrice * discount / 100}</div>
    </div>
  )
}
export default Discount
