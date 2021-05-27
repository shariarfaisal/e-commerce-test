import React from 'react'
import Layout from '../components/layout/Layout'
import PromoCodeContextProvider from '../contexts/PromoCodeContext'
import PromoCodesComponent from '../components/promo-codes/PromoCodes'

const PromoCodes = (props) => {
  return(
    <Layout>
      <PromoCodeContextProvider>
        <div className="row mx-0 justify-content-center">
          <PromoCodesComponent />
        </div>
      </PromoCodeContextProvider>
    </Layout>
  )
}
export default PromoCodes
