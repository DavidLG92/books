const mongoose = require("mongoose")

//Extraigo schema de mongoose
const {Schema} =  mongoose

//Objeto modelo libros
const bookModel = new Schema ({
    title: {type: String , required: true},
    author: {type: String, required: true},
    genre: {type: String},
    read: {type: Boolean},
    editorial: {type: String}
},
{
  collection: 'books'
})

//Exporto modulo para utilizarlo desde otro lado
module.exports = mongoose.model( "Book", bookModel)
