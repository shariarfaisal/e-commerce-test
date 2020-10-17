
class LocalCart{
  constructor(){
    let cart = sessionStorage.getItem('cart')
    if(!cart || typeof JSON.parse(cart) !== 'object'){
      sessionStorage.setItem('cart','{}')
      cart = '{}'
    }
    this.cart = JSON.parse(cart)
  }

  addItem(data){
    if('_id' in data && 'quantity' in data){
      this.cart[data._id] = data
      sessionStorage.setItem('cart',JSON.stringify(this.cart))
    }
  }

  deleteItem(id){
    delete this.cart[id]
    sessionStorage.setItem('cart',JSON.stringify(this.cart))
  }

  clearItems(){
    this.cart = []
    sessionStorage.setItem('cart','[]')
  }

  getItems(){
    if(typeof this.cart === 'object'){
      return Object.values(this.cart)
    }else{
      return []
    }
  }
}

export default new LocalCart()
