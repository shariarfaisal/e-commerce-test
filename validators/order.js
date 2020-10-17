
const itemsValidator = (items) => {
  let error = ""

  if(!Array.isArray(items)){
    error = "Items should be an array."
  }else if(items.length === 0){
    error = "Items can't be empty"
  }

  if(!error){
    for(let i in items){
      if(!mongoose.Types.ObjectId.isValid(items[i].item)){
        error = `Product Id ${items[i].item} isn't valid.`
        break
      }else if(
        !Number.isSafeInteger(Number(items[i].quantity)) ||
        Number(items[i].quantity) < 1
      ){
        error = `Quantity must be a positive number.`
        break
      }
    }
  }

  return error
}

module.exports = {
  itemsValidator
}
