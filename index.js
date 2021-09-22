require("dotenv").config();

// Frame work
const express = require("express");
const mongooes = require("mongoose");

//Database
const database = require("./Database/index");

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
bookLekh.get("/is/:isbn", (req,res)=>{
    const getSpecificBook = database.books.filter( 
        (book) => book.ISBN === req.params.isbn
    );
    if(getSpecificBook.length == 0){
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
bookLekh.get("/c/:category", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category) );
    if(getSpecificBook.length == 0){
        return res.json({error:`No book found for the ISBN of ${req.params.category}` });
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
bookLekh.post("/book/new", (req,res)=>{
    const {newBook} = req.body;
    database.books.push(newBook);
    return res.json({books:database.books, massage:"Book was added!!"});
});


/* 
Route              /book/update
Description        update title of book
Access             Public
Parameters         isbn
Method             PUT
*/
bookLekh.put("/book/update/:isbn", (req,res)=>{
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            book.title = req.body.bookTitle;
            return ;
        }
    });

    return res.json({books: database.books});
});


/* 
Route              /book/update/author
Description        update/add new author for a book
Access             Public
Parameters         isbn
Method             PUT
*/
bookLekh.put("/book/update/author/:isbn", (req,res)=>{
    //update the book database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn)
        return book.authors.push(req.body.newAuthor);
    });

    //update the author database
    database.authors.forEach((author)=>{
        if(author.id === req.body.newAuthor)
        return author.books.push(req.params.isbn);
    });

    return res.json({books: database.books, authors: database.authors, massage: "New author was addaed!!!"});  
});


/*_________________________________________________AUTHOR__________________________________________________*/




/* 
Route              /author
Description        get all authors
Access             Public
Parameters         none
Method             GET
*/
bookLekh.get("/author", (req,res) => {
        return res.json({authors:database.authors})
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
    database.authors.push(newAuthor);
    return res.json({authors: database.authors, massage:"Author was Added !!"});
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
    database.publications.push(newPublication);
    return res.json({Publication: database.publications, massage:"Publication was Added !!"});
})


bookLekh.listen(3000, () => console.log("Server running!!"));
