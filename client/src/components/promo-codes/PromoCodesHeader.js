import React from 'react'

const PromoCodeHeaders = (props) => {
  return(
    <div style={{fontSize: '1.2rem'}} className="list-group-item bg-dark text-light rounded-0 border-0 p-3 my-2 d-flex bg-light">
        <div style={{width: "25%"}}>Code</div>
        <div style={{width: "12%"}}>Discount</div>
        <div style={{width: "12%"}}>Max Use</div>
        <div style={{width: "12%"}}>Used</div>
        <div style={{width: "12%"}}>Active</div>
        <div style={{width: "15%"}}>Deadline</div>
        <div className="text-center" style={{width: "12%"}}>Actions</div>
    </div>
  )
}
export default PromoCodeHeaders
