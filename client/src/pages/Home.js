import React,{ useContext } from 'react'
import Layout from '../components/layout/Layout'
import Products from '../components/home/Products'
import CartSectoin from '../components/home/CartSection'
import { BaseContext } from '../contexts/BaseContext'

const Home = (props) => {
  const { cart } = useContext(BaseContext)
  return(
    <Layout>
      <div className="home-content">
        <div className="row mx-0">
          <div className={`col-md-${cart?'6': '12'} col-lg-${cart?'8': '12'}`} style={{transition: '.3s ease'}}>
            <div className="py-5 px-3">

              <Products />

            </div>
          </div>
          {cart && <div className="col-md-6 col-lg-4 order-first order-md-last">
            <div className="py-5 px-3">
              <CartSectoin />
            </div>
          </div>}
        </div>
      </div>
    </Layout>
  )
}
export default Home
