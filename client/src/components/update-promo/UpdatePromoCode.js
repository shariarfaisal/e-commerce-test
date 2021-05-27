import React,{ useContext, useState, useEffect } from 'react'
import Form from './Form'
import { PromoCodeContext } from '../../contexts/PromoCodeContext'
import { useParams } from 'react-router-dom'


const UpdatePromoCode = (props) => {
  const [error,setError] = useState('')
  const [data,setData] = useState(null)
  const { getPromoCode } = useContext(PromoCodeContext)
  const { id } = useParams()


  useEffect(() => {
    getPromoCode({
      id,
      setError,
      setData
    })
  },[])

  return(
    <div className="row mx-0 justify-content-center p-5" style={{minHeight: '70vh'}}>
      {!data && !error && <div className="text-muted text-center">loading...</div>}
      {error && <div className="p-5 text-center">{error}</div>}
      {console.log(data)}
      {data && <Form {...data} setData={setData}/>}
    </div>
  )
}
export default UpdatePromoCode
