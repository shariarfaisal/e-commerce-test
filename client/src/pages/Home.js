import React from 'react'
import Layout from '../components/layout/Layout'
import Orders from '../components/orders/Orders'
import OrderContextProvider from '../contexts/OrderContext'


const Home = (props) => {
  return(
    <Layout>
      <OrderContextProvider>
        <Orders />
      </OrderContextProvider>
    </Layout>
  )
}
export default Home
