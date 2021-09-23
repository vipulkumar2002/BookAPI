require("dotenv").config();

// Frame work
const express = require("express");
const mongooes = require("mongoose");

//Database
const database = require("./Database/index");

// include models
const bookModel = require("./Database/book");
const authorModel = require("./Database/author");
const publicationModel = require("./Database/publication");

//initializing
const bookLekh = express();

//Configuration
bookLekh.use(express.json());

// Establish Database connection
mongooes.connect(process.env.MONGO_URL, 
    
)
.then(()=>console.log("connection established!!"));



/*_________________________________________BOOK_______________________________________*/

/*  
Route              /
Description        get all books
Access             Public
Parameters         None
Method             GET
*/
bookLekh.get("/", (req,res) => {
    const getAllBooks = bookModel.find();
    //hello change
    return res.json({books: database.books});
});
 
/* 
Route              /is
Description        get specific book based on ISBN
Access             Public
Parameters         isbn
Method             GET
*/
bookLekh.get("/is/:isbn", async(req,res)=>{
    const getSpecificBook = await bookModel.findOne({ISBN: req.params.isbn});
    
    // const getSpecificBook = database.books.filter( 
    //     (book) => book.ISBN === req.params.isbn
    // );
    if(!getSpecificBook){
        return res.json({
            error:`No book found for the ISBN of ${req.params.isbn}`
        });
    };
    return res.json({books: getSpecificBook});
});


/* 
Route              /C
Description        get specific books on A category
Access             Public
Parameters         language
Method             GET
*/
bookLekh.get("/c/:language", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language.includes(req.params.language) );
    if(getSpecificBook.length == 0){
        return res.json({error:`No book found for the ISBN of ${req.params.language}` });
    }
    return res.json({books: getSpecificBook});
});


/* 
Route              /C
Description        get list of books based on languages
Access             Public
Parameters         category
Method             GET
*/
bookLekh.get("/c/:category", async (req,res) => {
    const getSpecificBook = await bookModel.findOne({category: req.params.category,});
    // const getSpecificBook = database.books.filter(
    //     (book) => book.category.includes(req.params.category) );
    if(!getSpecificBook){
        return res.json({error:`No book found in this category of ${req.params.category}` });
    }
    return res.json({books: getSpecificBook});
});



/* 
Route              /book/new
Description        add new books
Access             Public
Parameters         none
Method             POST
*/
bookLekh.post("/book/new", async(req,res)=>{
    const {newBook} = req.body;

    bookModel.create(newBook);
    // database.books.push(newBook);

    return res.json({massage:"Book was added!!"});
});


/* 
Route              /book/update
Description        update title of book
Access             Public
Parameters         isbn
Method             PUT
*/
bookLekh.put("/book/update/:isbn", async(req,res)=>{
    const updatedBook = await bookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
        },
        {
            title: req.body.bookTitle,
        },
        {
            new: true,
        } 
    );

    /*  database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            book.title = req.body.bookTitle;
            return ;
        }
    });   */

    return res.json({books: updatedBook});
});


/* 
Route              /book/update/author
Description        update/add new author for a book
Access             Public
Parameters         isbn
Method             PUT
*/
bookLekh.put("/book/update/author/:isbn", async(req,res)=>{
    //update the book database
    const updatedBook = await bookModel.findByIdAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $pull: {
                authors : req.body.newAuthor
            }
        },
        {
            new: true
        }
    );
    /* database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn)
        return book.authors.push(req.body.newAuthor);
    });   */  

    //update the author database
    const updatedAuthor = await authorModel.findByIdAndUpdate(
        {
            id: req.body.newAuthor
        },
        {
            $push : {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    )
    /*   database.authors.forEach((author)=>{
        if(author.id === req.body.newAuthor)
        return author.books.push(req.params.isbn);
    });  */

    return res.json({books: updatedBook, authors:updatedAuthor, massage: "New author was added"});  
});


/* 
Route              /book/update/author
Description        update/add new author for a book
Access             Public
Parameters         isbn
Method             PUT
*/
bookLekh.delete("/book/delete/:isbn", (req, res) => {

    const updatedBookDatabase = database.books.filter(
      (book) => book.ISBN !== req.params.isbn
    );

    database.books = updatedBookDatabase;
    return res.json({books: database.books});
});


/*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameters      isbn, author id
Method          DELETE
*/
bookLekh.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
    // update the book database
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
        const newAuthorList = book.authors.filter(
          (author) => author !== parseInt(req.params.authorId)
        );
        book.authors = newAuthorList;
        return;
      }
    });
});
/*_________________________________________________AUTHOR__________________________________________________*/




/* 
Route              /author
Description        get all authors
Access             Public
Parameters         none
Method             GET
*/
bookLekh.get("/author", async(req,res) => {
        const getAllAuthor = await authorModel.find();
        return res.json({authors:getAllAuthor});
    }
);





/* 
Route              /author
Description        get specific authors
Access             Public
Parameters         Name
Method             GET
*/
bookLekh.get("/author/:Name", (req,res) => {
    const getSpecificAuthor = database.authors.filter( 
        (author) => author.name === req.params.Name
    );
    if(getSpecificAuthor.length == 0){
        return res.json({
            error:`No Authore found for the Name of ${req.params.Name}`
        });
    };
    return res.json({Name: getSpecificAuthor});
}
);




/* 
Route              /author
Description        get list of authors based on books
Access             Public
Parameters         isbn
Method             GET
*/
bookLekh.get("/author/:isbn", (req,res) =>{
    const getSpecificAuthors = database.authors.filter((author)=>
        author.books.includes(req.params.isbn)
    );
    if(getSpecificAuthors.length === 0){
        return res.json({error: `No authore find for this book ${req.params.isbn}`,});
    }

    return res.json({authors: getSpecificAuthors});
});



/* 
Route              /author/new
Description        add new author
Access             Public
Parameters         isbn
Method             GET
*/
bookLekh.post("/author/new", (req,res)=>{
    const {newAuthor} = req.body;
    authorModel.create(newAuthor);
    // database.authors.push(newAuthor);
    return res.json({massage:"Author was Added !!"});
});





/*_______________________________________________PUBLICATION__________________________________________________*/


/* 
Route              /publications
Description        get all publication
Access             Public
Parameters         none
Method             POST
*/
bookLekh.get("/publication", (req,res) => {
    return res.json({publication:database.publications})
}
);


/* 
Route              /publications
Description        get specific publication of a book
Access             Public
Parameters         none
Method             POST
*/
bookLekh.get("/publication/:isbn", (req,res) =>{
    const getSpecificAuthors = database.books.filter((publications)=>
        publications.publication === req.params.isbn);
    if(getSpecificAuthors.length === 0){
        return res.json({error: `No authore find for this book ${req.params.isbn}`,});
    }

    return res.json({authors: getSpecificAuthors});
});


/* 
Route              /publication/new
Description        add new author
Access             Public
Parameters         isbn
Method             GET
*/
bookLekh.post("/publication/new", (req,res)=>{
    const {newPublication} = req.body;
    publicationModel.create(newPublication);
    // database.publications.push(newPublication);
    return res.json({ massage:"Publication was Added !!"});
});

bookLekh.listen(3000, () => console.log("Server running!!") );