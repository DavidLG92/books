//Validaciones
const Joi = require('joi')

//Validar schema
const bodySchema = Joi.object({
  firstName: Joi.string().alphanum().required().min(3).max(40),
  lastName: Joi.string().required().min(3).max(40),
  userName: Joi.string(),
  password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: Joi.string().required().email().min(15),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  birthYear: Joi.number().min(1920).max(2021).required()
})

const paramsSchema = Joi.object({
  userId: Joi.string().required()
})

const querySchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(40),
    lastName: Joi.string().min(3).max(40),
    userName: Joi.string(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email(),
    address: Joi.string(),
    phone: Joi.string(),
    birthYear: Joi.number().min(1920).max(2021)
})

const loginSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})
   
//Exporto las validaciones para llamarlas desde otro lado
module.exports = { bodySchema, paramsSchema, querySchema, loginSchema }