import React,{ useContext } from 'react'
import axios from 'axios'
import { ProductContext } from '../../contexts/ProductContext'

const CartItemsItem = ({ _id, name, price, quality, image, quantity }) => {
  const url = axios.defaults.baseURL
  const { increaseQuantity, decreaseQuantity, deleteCartItem } = useContext(ProductContext)

  return(
    <div className="cart-items-item d-flex px-3 py-2">
      <img src={url+image} alt="" />
      <div className="body px-2">
        <h5 className="img-title w-100 mb-0 d-flex justify-content-between align-items-center">
          <span>{name}</span>
          <i onClick={e => deleteCartItem(_id)} className="bx bx-trash text-danger mx-2" style={{fontSize: '1rem'}}></i>
        </h5>
        <small style={{fontSize: '.9rem'}} className="d-block text-muted category">{quality}</small>
        <div className="d-flex align-items-center" style={{fontSize: '1.2rem'}}>
          <span className="px-2"><i onClick={e => decreaseQuantity(_id)} className="bx bx-minus"></i></span>
          <span className="px-2">{quantity}</span>
          <span className="px-2"><i onClick={e => increaseQuantity(_id)} className="bx bx-plus"></i></span>
          <span style={{fontSize: '1rem'}} className="px-2 ml-auto">{quantity} <i className="bx bx-x"></i> ${price} = ${quantity*price}</span>
        </div>
      </div>
    </div>
  )
}

export default CartItemsItem
