import React from 'react'

const OrdersHeader = ({ filter }) => {
  return(
    <div style={{fontSize: '1.2rem'}} className="list-group-item bg-dark text-light rounded-0 border-0 p-3 my-2 d-flex bg-light">
        <div style={{width: "10%"}}>#</div>
        <div style={{width: "25%"}}>Order ID</div>
        <div style={{width: "20%"}}>Price</div>
        <div style={{width: "20%"}}>Status</div>
        {filter === 'pending' && <div className="text-center" style={{width: "25%"}}>Actions</div>}
    </div>
  )
}
export default OrdersHeader
