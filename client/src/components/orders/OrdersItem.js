import React,{ useState } from 'react'

const OrdersItem = ({ i, _id, orderId, price, status, orderHandler, filter }) => {
  const [confirmLoader,setConfirmLoader] = useState(false)
  const [cancelLoader,setCancelLoader] = useState(false)

  const confirmHandler = e => {
    orderHandler({
      _id, payloads: { status: 'confirm'}, setLoading: setConfirmLoader
    })
  }

  const cancelHandler = e => {
    orderHandler({
      _id, payloads: { status: 'cancel'}, setLoading: setCancelLoader
    })
  }

  return(
    <div className="list-group-item list-group-item-action">
      <div style={{width: "10%"}}>{i}</div>
      <div style={{width: "25%"}}>{orderId}</div>
      <div style={{width: "20%"}}>{price}</div>
      <div
        className={status === 'confirm'? 'text-success': status === 'cancel'? 'text-danger': ''} 
        style={{width: "20%"}}>
          {status}
      </div>
      {filter === 'pending' && <div style={{width: "25%"}} className="d-flex justify-content-center">
        <button onClick={confirmHandler} className="btn px-3 btn-sm btn-success mx-2 round-20" type="button">Confirm {confirmLoader && <i className="bx bx-loader bx-spin ml-2"></i>}</button>
        <button onClick={cancelHandler} className="btn px-3 btn-sm btn-danger mx-2 round-20" type="button">Cancel {cancelLoader && <i className="bx bx-loader bx-spin ml-2"></i>}</button>
      </div>}
    </div>
  )
}
export default OrdersItem
