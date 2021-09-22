
const books = [
    { 
        ISBN: "123ONE",
        title: "Geting started with MERN",
        authors: [1,2],
        language: "english",
        pubDate: "2021-09-09",
        NoOfPage: 225,
        category: ["friction", "programming", "tech",],
        publication:1 
    },
    { 
        ISBN: "123TWO",
        title: "Geting started with C++",
        authors: [1,2],
        language: "english",
        pubDate: "2021-09-09",
        NoOfPage: 225,
        category: ["friction", "programming", "tech",],
        publication:2 
    },
    { 
        ISBN: "123THREE",
        title: "Geting started with JavaScript",
        authors: [1,2],
        language: "english",
        pubDate: "2021-09-09",
        NoOfPage: 225,
        category: ["friction", "programming", "tech",],
        publication:3 
    },
];

const authors = [
    {
        id: 1,
        name: "Vipul",
        books:["123ONE"],
    },
    {
        id: 2,
        name: "Vishal",
        books:["123TWO"],
    },
];

const publications = [
    { 
        id: 1,
        name: "Kumar",
        books:["123THREE"],  
    }
]; 


// export data to another file
module.exports = {books, authors, publications};