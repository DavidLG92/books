//Requiero al framework express
const express = require('express')

//Requiero a la base de datos
const mongoose = require('mongoose')
const Book = require('./models/bookmodel.js')
const User = require('./models/usermodel.js')
const bookRouter = require('./routes/bookRouter.js')(Book)
const userRouter = require('./routes/userRouter.js')(User)
/*const jwt = require('express-jwt')*/

//Llamo a la funcion express
const app = express()

const bodyParser = require('body-parser')
//Limpio los datos del body al endpoint
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
/*app.all('/api/*', jwt( {secret:'David36865467', algorithms:['HS256'] } ).unless({path: ['/api/users/login']}))*/
app.use('/api', bookRouter)
app.use('/api', userRouter)

//Conexion a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/bookAPI")
  } catch (error){
    throw error
  }
}
connectDB()

//Escucha al puerto local 8080
const port = 8080
app.listen(port, ()=> {
  console.log(`server started on port : ${port}`)
})