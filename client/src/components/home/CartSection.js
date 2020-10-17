import React,{ Fragment, useContext, useState } from 'react'
import CartItemsItem from './CartItemsItem'
import Promo from './Promo'
import Discount from './Discount'
import { ProductContext } from '../../contexts/ProductContext'

const CartSectoin = (props) => {
  const { cartItems, totalPrice, promo, getCheckout } = useContext(ProductContext)
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)

  const checkoutHandler = e => {
    e.preventDefault()
    getCheckout({
      setError,
      setLoading
    })
  }

  return(
    <div className="cart-section bg-light shadow slow-right order-first" style={{minHeight: '30rem'}}>
      <div className="header p-3">
        <h3 className="title mb-0 text-info">Cart Items</h3>
        <small className="d-block text-center text-danger py-2">{error.promoCode && error.promoCode}</small>
      </div>
      <div className="cart-items py-3">

        {cartItems.length === 0 && <div className="text-center py-4 text-muted">No items found.</div>}

        {cartItems.map(
          (item,i) => <CartItemsItem
            key={i}
            {...item}
          />
        )}

      </div>

      {cartItems.length !== 0 && <Fragment>
        <Promo />
        {promo && <Discount {...promo} totalPrice={totalPrice}/>}

        <div className="footer px-3 py-2 border-top d-flex justify-content-between align-items-center">
          <button onClick={checkoutHandler} className="btn btn-light round-20 px-3 d-flex align-items-center" type="button">
            <i className="bx bx-cart-alt text-warning mr-2"></i>
            <span>Checkout</span>
            {loading && <i className="bx bx-loader bx-spin ml-2"></i>}
          </button>
          {!promo && <div style={{fontSize: '1.3rem'}}>${totalPrice}</div>}
          {promo && <div style={{fontSize: '1.3rem'}}>${totalPrice - (totalPrice * promo.discount / 100)}</div>}
        </div>
      </Fragment>}



    </div>
  )
}
export default CartSectoin
