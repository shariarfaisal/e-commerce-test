import React,{ useState, useContext } from 'react'
import { ProductContext } from '../../contexts/ProductContext'



const FromGroup = ({ id, label, className, value, setValue, type, error, required}) => (
  <div className={className}>
    <label htmlFor={id}>{ label }</label>
    <input
      className="form-control"
      id={id}
      type={type}
      value={value}
      placeholder={label}
      onChange={e => setValue(e.target.value)}
      required={required}
    />
    <small className="text-danger d-block">{error && error}</small>
  </div>
)

const CreateProduct = (props) => {
  const [open,setOpen] = useState(false)
  const [name,setName] = useState('')
  const [image,setImage] = useState('')
  const [price,setPrice] = useState(0)
  const [quality,setQuality] = useState('')
  const [description,setDescription] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)
  const { createProduct } = useContext(ProductContext)

  const submitHandler = async e => {
    e.preventDefault()
    const payloads = new FormData();
    payloads.append('name',name);
    payloads.append('price',price);
    payloads.append('image',image);
    payloads.append('quality',quality);
    payloads.append('description',description);

    const done = await createProduct({
      setError,
      setLoading,
      payloads
    })
    if(done){
      setName('')
      setPrice(0)
      setQuality('')
      setDescription('')
      setError('')
    }
  }


  return(
    <div className="col-lg-11 my-5">
      <h3 onClick={e => setOpen(!open)} className="text-muted pointer mb-3"><i className="bx bx-plus"></i> Add New</h3>
      {open && <form onSubmit={submitHandler} className="bg-light p-4 mb-3 shadow create-product-form slow-down">
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input required onChange={e => setImage(e.target.files[0])} className="border-0" id="image" type="file" />
          <small className="text-danger d-block">{error.image && error.image}</small>
        </div>
        <FromGroup
          id="name"
          label="Name"
          type="text"
          className="form-group"
          value={name}
          setValue={setName}
          error={error.name}
          required={true}
        />

        <div className="row justify-content-center">
          <FromGroup
            id="price"
            label="Price"
            type="number"
            className="form-group col-6"
            value={price}
            setValue={setPrice}
            required={true}
            error={error.price}
          />
          <FromGroup
            id="quality"
            label="Quality"
            type="text"
            className="form-group col-6"
            value={quality}
            setValue={setQuality}
            required={false}
            error={error.quality}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            required={false}
            id="description"
            error={error.description}
            style={{minHeight: '10rem'}}
            onChange={e => setDescription(e.target.value)}
            className="form-control" value={description}>
          </textarea>
        </div>

        <div className="d-flex py-3">
          <button onClick={e => setOpen(false)} className="round-20 btn btn-warning mx-2 px-4 ml-auto" type="button">Cancel</button>
          <button disabled={loading} className="round-20 btn btn-info mx-2 px-4" type="submit">
            Submit
            {loading && <i className="bx bx-loader bx-spin ml-2"></i>}
          </button>
        </div>
      </form>}
    </div>
  )
}
export default CreateProduct
