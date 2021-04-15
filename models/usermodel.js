const mongoose = require("mongoose")

//Extraigo schema de mongoose
const {Schema} =  mongoose

//Objeto modelo para usuario unico
const userModel = new Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    birthYear : {type: Number, required: true}
},
{
  collection: 'users'
})
//Exporto modulo para utilizarlo desde otro lado
module.exports = mongoose.model( "User", userModel)