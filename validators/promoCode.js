
const createValidator = ({ code, maxUse, deadline, discount, active }) =>{
  const errors = {}

  if(!code) errors.code = "Code required."
  if(maxUse && !Number(maxUse)) errors.maxUse = "Maximum use should be a positive number"
  if(deadline && new Date(deadline) == 'Invalid Date') errors.deadline = "Invalid deadline."
  if(
    !Number.isSafeInteger(Number(discount)) || Number(discount) < 0
  ) errors.discount = "Discount must be a positive number"
  else if(Number(discount) > 100){
    errors.discount = "Up to 100% doesn't allowed."
  }
  return { errors, isValid: Object.keys(errors).length === 0}
}



const promoCodeValidator = async (promo) => {
  let promoError = ""
  if(!promo){
    promoError = "Not available."
  }else if(
    promo.deadline && new Date(promo.deadline) < new Date()
  ){
    promoError = "Expired."
  }else if(
    promo.maxUse && promo.maxUse === promo.used
  ){
    promoError = "Not available."
  }

  return promoError
}

module.exports = {
  createValidator,
  promoCodeValidator
}
