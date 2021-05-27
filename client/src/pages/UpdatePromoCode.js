import React from 'react'
import Layout from '../components/layout/Layout'
import UpdatePromoCodeComponents from '../components/update-promo/UpdatePromoCode'
import PromoCodeContextProvider from '../contexts/PromoCodeContext'

const UpdatePromoCode = (props) => {
  return(
    <Layout>
      <PromoCodeContextProvider>
        <UpdatePromoCodeComponents />
      </PromoCodeContextProvider>
    </Layout>
  )
}
export default UpdatePromoCode
