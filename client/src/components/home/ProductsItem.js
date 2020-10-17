import React,{ useContext } from 'react'
import { Link } from 'react-router-dom'
import { BaseContext } from '../../contexts/BaseContext'
import axios from 'axios'

const ProductsItem = ({ _id, name, image, price, quality, addCartItem, cartExists }) => {
  const { cart } = useContext(BaseContext)
  const url = axios.defaults.baseURL
  return(
    <div className={`col-sm-6 col-md-${cart?'6': '4'} col-lg-${cart?'4': '3'} my-3`}>
      <div className="shadow images-item">
        <img src={url+image} alt="" height="150px"/>
        <div className="body">
          <div>
            <Link to={`/products/${_id}`} className="title text-info link">{name}</Link>
            <small className="category text-muted d-block">{quality}</small>
          </div>
          <div className="d-flex justify-content-between pt-3 footer">
            <div className="price">${price}</div>
            <div>
              <i onClick={e => addCartItem({_id,quantity: 1})} className={`bx bxs-cart-add link bx-md text-${cartExists?'danger': 'warning'}`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsItem
