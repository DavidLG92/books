const booksController = (Book) =>{
  const getBooks = async (req,res)=> {
    try {
      const {query} = req
      //Recupero los libros
      const response = await Book.find(query)

      return res.json(response)
    } catch(error){
      console.log('getBooks - error', error)
      throw error
    }
  }
   
  //Crear libro
  const postBook = async (req,res)=> {
    try {
      const book = new Book( req.body )
      
      await book.save()
      return res.status(201).json(book)
    }catch(error) {
      console.log('postBook - error', error)
      throw error
    }
  }

  //Busqueda de libro por ID
  const getBookById = async (req,res)=> {
    try {
      const {params} = req
      
      const response = await Book.findById(params.bookId)
      
      if ( response && response !== null) {
        return res.json(response)
      } else {
        return res.status(404).json({message:'Book not found'})
      }
    } catch(error){
      console.log('getBookById - error', error)
      throw error
    }
  }

  //Grabado del libro
  const putBook = async (req,res)=> {
      try {
      const {params, body} = req
      const response = await Book.updateOne({
          _id: params.bookId 
      }, {
          $set: {
              title: body.title,
              author: body.author,
              genre: body.genre,
              read: body.read,
              editorial: body.editorial
          }
      })

      if(response && response !== null) {
        return res.status(202).json(response)
      }
      else{
        return res.status(404).json({message:'Book not found'})
      }
    } catch(error){
      console.log('putBook - error', error)
      throw error
    }
  }

  //Borrado del libro
  const deleteBook = async (req, res) => {
    try {
      const {params} = req
      const response = await Book.findByIdAndDelete( params.bookId )

      if ( response && response !== null) {
        return res.status(202).json({message:'Book Deleted'})
      } else {
        return res.status(404).json({message:'Book not found'})
      }
    } catch(error){
      console.log('deleteBook - error', error)
      throw error
    }
  }

    return {getBooks, postBook, getBookById , putBook, deleteBook }
  } 

//Exporto el modulo para utilizarlo en otro lado
module.exports = booksController