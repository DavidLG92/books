//Endpoints
const express = require('express')
const booksController = require('../controllers/booksController')
const booksValidations = require('../validations/booksvalidations.js')
const validation = require('express-joi-validation').createValidator()

const routes = (Book)=>{
  const bookRouter = express.Router()
  const controller = booksController(Book)
  //Creo nueva ruta
  bookRouter.route('/books')
    //Leer
    .get(
      validation.query(booksValidations.querySchema), 
      controller.getBooks
    )
    //Crear
    .post(
    validation.body(booksValidations.bodySchema) ,
    controller.postBook
    )
    
  bookRouter.route('/books/:bookId')
    //Leer
    .get(
      validation.params(booksValidations.paramsSchema) , 
      controller.getBookById 
    )
    //Guardar 
    .put(
      validation.params(booksValidations.paramsSchema), 
      validation.body(booksValidations.bodySchema) , 
      controller.putBook
    )
    //Borrar
    .delete(validation.params(booksValidations.paramsSchema),controller.deleteBook )

  //Retorno de rutas de libros
  return bookRouter
}

//Exporto las rutas
module.exports = routes