//Endpoints
const express = require('express')
const usersController = require('../controllers/usersController')
const validation = require('express-joi-validation').createValidator()
const usersValidations = require('../validations/usersvalidations.js')


const routes = (User)=>{
    const userRouter = express.Router()
    const controller = usersController(User)

    userRouter.route('/users')
      //Leer
      .get(
        validation.query(usersValidations.querySchema), 
        controller.getUsers
      )
      //Crear 
      .post(
        validation.body(usersValidations.bodySchema), 
        controller.postUser
      )

    userRouter.route('/users/:userId')
      //Leer
      .get(
        validation.params(usersValidations.paramsSchema), 
        controller.getUserById
      )
      //Guardar 
      .put(
        validation.params(usersValidations.paramsSchema), 
        validation.body(usersValidations.bodySchema), 
        controller.putUser
      )
      //Borrar
      .delete(
        validation.params(usersValidations.paramsSchema), 
        controller.deleteUser
      )
        
    userRouter.route('/users/login')
      //Crear
      .post(
        validation.body(usersValidations.loginSchema),
        controller.postUserLogin
      )
     
  //Retorno de ruta de usuario 
  return userRouter
}

//Exporto las rutas
module.exports = routes