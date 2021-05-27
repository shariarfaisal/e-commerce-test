import React,{ useEffect, useContext } from 'react'
import { OrderContext } from '../../contexts/OrderContext'
import Filter from './Filter'
import OrdersHeader from './OrdersHeader'
import OrdersItem from './OrdersItem'

const Orders = (props) => {
  const { orders, getOrders, loading, orderHandler, setFilter, filter } = useContext(OrderContext)

  useEffect(() => {
    getOrders()
  },[filter])

  return(
    <div className="row mx-0 justify-content-center">
      <div className="col-lg-10 m-5 p-4 order-items">
        <Filter setFilter={setFilter} filter={filter}/>
        <div className="list-group">
          <OrdersHeader filter={filter}/>
          {loading && <div className="list-group-item">loading...</div>}
          {!loading && orders.length === 0 && <div className="list-group-item">No items found.</div>}
          {orders && orders.map((order,i) => <OrdersItem key={i} i={i+1} {...order} orderHandler={orderHandler} filter={filter}/>)}
        </div>
      </div>
    </div>
  )
}
export default Orders
