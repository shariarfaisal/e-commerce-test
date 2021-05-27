import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const ProductsItem = ({ _id, name, image, price, quality, deleteProduct }) => {
  return (
    <div className="list-group-item admin-projects-item rounded-0">
      <img className="image" src={`${axios.defaults.baseURL}/${image}`} alt="" />
      <div className="middle px-3">
        <Link to={`/products/${_id}`} className="name mb-0">{name}</Link>
        <div className="price"><strong>Price:</strong> ${price}</div>
        {quality && <div className="quality"><strong>Quality:</strong>{quality}</div>}
      </div>
      <div className="ml-auto d-flex align-items-center pointer">
        <i onClick={e => deleteProduct(_id)} className="bx bx-trash text-danger px-3" style={{fontSize: '1.2rem'}}></i>
      </div>
    </div>
  )
}

export default ProductsItem
