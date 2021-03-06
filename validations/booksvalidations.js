const Joi = require('joi')

//Validar schema
const bodySchema = Joi.object({
  title: Joi.string().required().min(2).max(50),
  author:  Joi.string().required().min(2),
  genre:  Joi.string().required(),
  read:   Joi.boolean().required()
})

const paramsSchema = Joi.object({
  bookId: Joi.string().required()
})

const querySchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  genre: Joi.string(),
  read: Joi.boolean()
})

//Exporto las validaciones para llamarlas desde otro lado
module.exports = { bodySchema, paramsSchema, querySchema }