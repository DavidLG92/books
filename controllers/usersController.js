/*const jwt = require('jsonwebtoken')*/
const bcrypt = require('bcrypt')

const usersController = (User) => {
  const getUsers = async (req,res)=> {
    try {
      const {query} = req
      //Recupero los usuarios
      const response = await User.find(query)
      return res.json(response)
    } catch(error){
      throw error
    }
  }
    
  const postUser = async (req,res) => {
    try {
      const {body} = req

      const newUserName = () => {
        if (body.lastName && body.firstName &&  body.birthYear ) { 
          //Selecciono el primer nombre o apellido
          const splitFirstName = body.firstName.split(" ")
          const splitLastName = body.lastName.split(" ")
          const newusername = splitLastName[0].toUpperCase() + "-"+ splitFirstName[0] + "-" + body.birthYear
          return (newusername)
        }
      }

      const foundUser = await User.findOne ({"userName": newUserName()})
      if (foundUser){
        return  res.status(400).json({message: "Existing UserName - User not inserted"});
      }
      const newpassword = await  bcrypt.hash(body.password, 10) 
      
      const userObject = 
      {
        ...body,
        userName: newUserName(),
        password: newpassword
      }
      
      const user = new User (userObject)
      await user.save()
      return res.status(201).json(user)
    } catch (err) {
      if (err.name === "ValidationError") {
        let errors = {}
        Object.keys(err.errors).forEach((key) => {
          errors[key] = err.errors[key].message
        })
  
        return res.status(400).send(errors)
      }
      res.status(500).json({message: "Something went wrong" , err})
    }
  }
  
  //Creacion de usuario
  const postUserLogin = async (req, res) => {
    try{
      const {body} = req
      const {userName , password} = body
      
      const foundUser = await User.findOne ({"userName": userName})
      if (foundUser ) {
        const isPasswordCorrect = await  bcrypt.compare( password , foundUser.password)
        if (isPasswordCorrect) {
          return  res.status(201).json({message: 'Valid User'/*,  token: createToken (foundUser)*/ })
        } else {
          return  res.status(404).json({message: 'Invalid Password'})
        }
      } else {
        return  res.status(404).json({message: 'Invalid User'})
      }
    } catch (error) {
      console.log('postUserLogin error:' + error)
      throw  error
    }
  }

  //Creacion de Token
 /* const createToken = (user) =>{
    const tokenUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email
    } 
    return  jwt.sign(tokenUser, 'David36865467')
  }*/

  //Leer usuario
  const getUserById = async (req,res)=> {
      try {
      const {params} = req
      const response = await User.findById(params.userId)
      if ( response && response !== null) {
        return res.json(response)
      } else {
        return res.status(404).json({message:'User not found'})
      }
    } catch(error){
      console.log(' getUserById error:' + error)
      throw error
    }
  }
  
  //Grabar usuarios
  const putUser = async (req,res)=> {
      try {
      const {params, body} = req
      const response = await User.updateOne({
          _id: params.userId 
      }, {
          $set: {
              firstName: body.firstName,
              lastName: body.lastName,
              userName: body.userName,
              password: body.password,
              email: body.email,
              address: body.address,
              phone: body.phone,
              yearBirthday: body.yearBirthday
          }
      })
      if(response && response !== null) {
        return res.status(202).json(response)
      }
      else{
        return res.status(404).json({message:'User not found'})
      }
    } catch(error){
      console.log('putUser - error', error)
      throw error
    }
  }

  //Borrar usuario
  const deleteUser = async (req, res) => {
    try {
      const {params} = req
      const response = await User.findByIdAndDelete( params.userId  )
      if ( response && response !== null) {
        return res.status(202).json({message:'User Deleted'})
      } else {
        return res.status(404).json({message:'User not found'})
      }            
    } catch(error){
      console.log('deleteUser - error', error)
      throw error
    }
  }

   return {getUsers , postUser, getUserById , putUser, deleteUser , postUserLogin }
}

//Exporto el modulo para utilizarlo en otro lado
module.exports = usersController