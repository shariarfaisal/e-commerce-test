import React from 'react'
import Layout from '../components/layout/Layout'
import Form from '../components/create-promo/Form'
import PromoCodeContextProvider from '../contexts/PromoCodeContext'

const CreatePromoCode = (props) => {
  return(
    <Layout>
      <PromoCodeContextProvider>
        <div className="row mx-0 justify-content-center p-5" style={{minHeight: '70vh'}}>
          <Form />
        </div>
      </PromoCodeContextProvider>
    </Layout>
  )
}
export default CreatePromoCode
