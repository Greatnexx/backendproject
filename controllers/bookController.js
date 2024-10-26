import Book from "../models/bookModel.js";

const addBook=async(req,res)=>{
    try {
    const {title,author,genre,publicationYear,description,rating}= req.body;

    const newBook = await Book.create({
        title,
        author,
        genre,
        publicationYear,
        description,
        rating
    })

    const saveBook= await newBook.save();
    if(!saveBook){
        return res.status(401).json({msg:'Unable to save Book'})
    }
    res.status(201).json({msg:'Book Added Sucessfully',data:saveBook}) 
        
    } catch (error) {
        res.status(500).json({msg: error});
        
    }

}


const getAllBooks=async(req,res)=>{
    try {
         const pageSize = 10
         const page = req.query.page || 1
          
            const keyword = req.query.keyword
              ? {
                title: {
                    $regex: req.query.keyword,
                    $options: 'i',
                  },
                }
              : {}
          
            const count = await Book.countDocuments({ ...keyword })
            console.log("count: ", count)
            const books = await Book.find({ ...keyword }).sort({ createdAt: -1 })
              .limit(pageSize)
              .skip(pageSize * (page - 1))
              if(!books){
                return res.status(404).json({msg:'No Books Found'})
            }
            res.json({ books, page, pages: Math.ceil(count /pageSize)})
    } catch (error) {
        res.status(500).json({msg: error});
        
    }
}


const singleBook =async(req,res)=>{
    try {
        const id =req.params.id;
      const book= await Book.findById(id);
        if(!book){
            return res.status(404).json({msg:'Book not Found'})
        }
        res.status(200).json({msg:`Book for ${id} retrieved sucessfully `,data:book})
        
    } catch (error) {
        res.status(500).json({msg: error});
        
    }
}

const updateBook=async(req,res)=>{
    try {
        const id =req.params.id;
        const {title,author,genre,publicationYear,description,rating}= req.body;
      const updatedBook= await Book.findByIdAndUpdate(id,
        {title,author,genre,publicationYear,description,rating}
        ,{new: true, useFindandModify: false});
        if(!updatedBook){
            return res.status(404).json({msg:'Book not Found'})
        }
        res.status(200).json({msg:`Book for ${id} updated sucessfully `,data:updatedBook})
        
    } catch (error) {
        res.status(500).json({msg: error});
        
    }
}

const deleteBook=async(req,res)=>{
    try {
        const id =req.params.id;
      const deletedBook= await Book.findByIdAndDelete(id);
      
        if(!deletedBook){
            return res.status(404).json({msg:'Book not Found'})
        }
        res.status(200).json({msg:`Book for ${id} deleted sucessfully `})
        
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

export {addBook,getAllBooks,singleBook,updateBook,deleteBook}