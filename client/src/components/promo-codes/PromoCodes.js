import React,{ useContext, useEffect, useState } from 'react'
import { PromoCodeContext } from '../../contexts/PromoCodeContext'
import './style.scss'
import PromoCodesItem from './PromoCodesItem'
import PromoCodesHeader from './PromoCodesHeader'
import Filter from './Filter'

const PromoCodes = (props) => {
  const { getPromoCodes, promoCodes, filter, setFilter } = useContext(PromoCodeContext)
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    getPromoCodes({
      setLoading
    })
  },[filter])

  return(
    <div className="col-11 col-lg-10 my-5 code-items">
      <Filter setFilter={setFilter} filter={filter}/>
      <div className="list-group">
        <PromoCodesHeader />
        {loading && <div className="text-muted">loading...</div>}
        {promoCodes.length > 0 && promoCodes.map((code,i) => <PromoCodesItem key={i} {...code} />)}
      </div>
    </div>
  )
}
export default PromoCodes
