let = books =[
    {
        id:1,
        title:"History",
        subject:"",
        author:{name:"Kumara",author_id:1},
        publicationYear:2013,
        total_copies:4,
        issued_copies:0,
    },
    {
        id:2,
        title:"Biology",
        subject:"",
        author:{name:"Kumara",author_id:1},
        publicationYear:2013,
        total_copies:4,
        issued_copies:0,
    },
    {
        id:3,
        title:"Comic",
        subject:"",
        author:{name:"Kumara",author_id:1},
        publicationYear:2013,
        total_copies:4,
        issued_copies:0,
    },
    {
        id:4,
        title:"Architecture",
        subject:"",
        author:{name:"Kumara",author_id:1},
        publicationYear:2013,
        total_copies:4,
        issued_copies:0,
    },
    {
        id:5,
        title:"Movie",
        subject:"",
        author:{name:"Kumara",author_id:1},
        publicationYear:2013,
        total_copies:4,
        issued_copies:0,
    },
]


let users = [
    {
        id:1,
        name:"kumara",
    },
    {
        id:2,
        name:"Madhu",
    },
    {
        id:3,
        name:"Nagesh",
    },
]

let books_issued = [{
    book_id:2,
    user_id:1,
    due_date:1594578600000, //03/07/2020
    issue_date:1593714600000, //13/07/2020
    is_returned:false,
},
{
    book_id:2,
    user_id:3,
    due_date:1591554600000,//08/06/2020
    issue_date:1593282600000,//28/06/2020
    is_returned:false,
},
{
    book_id:3,
    user_id:2,
    due_date:1592850600000,////23/07/2020
    issue_date:1591986600000,////07/06/2020
    is_returned:false,
}]

getBook = (title) => {
   return books.find(item =>
       title === item.title
   )
}

getBookStatus = (title) => { 
  let book = getBook(title);
  let bookIssuedStatus = books_issued.filter(item => item.id === book.id && !item.is_returned).sort((item1,item2) =>  item1.due_date-item2.due_date);
  let next_available_date = new Date();
  let total_copies_availble = book.total_copies - book.issued_copies;
  if(total_copies_availble === 0){
   next_available_date = bookIssuedStatus[0].due_date
  }
  return {book:book,next_available_date : next_available_date,total_copies_availble:total_copies_availble}
}

getAllBookStatus = (status) => {
    switch (status) {
        case "BOOKS_ISSUED" : {
            let issuedBooks = books_issued.filter(item => !item.is_returned);
            console.log("Books Issued : " ,issuedBooks.length)
        }
        case "BOOKS_AVAILABLE" : {
            let availableBooks = books.filter(item => (item.total_copies - item.issued_copies) === 0);
            let availableBooksCount  = availableBooks.reduce((acc,item)=> acc + (item.total_copies - item.issued_copies),0)
            console.log("Books Available : ",availableBooksCount)
        }
        case "ISSUED_BOOK_DETAILS" : {
            let issuedBookDetails = books.filter(item => item.total_copies - item.issued_copies > 0);
            if(issuedBookDetails){
                issuedBookDetails.forEach(element => {
                   console.log(element.title, ":", element) 
                });
            }   
        }
    }
}

issueBook = (book_id,user_id) =>{
    let booksArray = books_issued.filter(item => item.user_id === user_id && !item.is_returned)
    if(booksArray.length === 3){
        console.log("Limit")
    }
    else if(booksArray.length >0 && booksArray.length <3) {
       if((booksArray.filter(item => item.book_id === book_id)).length > 0){
           console.log("Same book can't be barrowed multiple times")
       }
       else {
           let book_idx = books.findIndex(item => item.id === book_id);
           if(book_idx !== -1){
            let issued_date = new Date()
            let due_date = new Date().setDate(issued_date.getDate() + 10)
             books_issued.push({
             book_id:book_id,
             user_id:user_id,
             due_date:due_date,
             issue_date:issued_date.getTime(),
             is_returned:false})

             books[book_idx].issued_copies = books[book_idx].issued_copies + 1;
             console.log("Book issued",)
           }else{
               console.log("Book not found",book_id,user_id)
           }
       }
    }
    else {
        let book_idx = Books.findIndex(item => item.id === book_id);
           if(book_idx !== -1){
            let issued_date = new Date()
            let due_date = new Date().setDate(issued_date.getDate() + 10)
             books_issued.push({
             book_id:book_id,
             user_id:user_id,
             due_date:due_date.getTime(),
             issue_date:issued_date.getTime(),
             is_returned:false})

             Books[book_idx].issued_copies = Books[book_idx].issued_copies + 1;
           }else{
               console.log("Book not found")
           }
    }
}

returnBook = (book_id,user_id) => {
    let book_idx = books.findIndex(item => item.id === book_id);
    if(book_idx !== -1){
        books[book_idx].issued_copies = books[book_idx].issued_copies - 1;
        let issued_book_idx = books_issued.findIndex(item => item.book_id === book_id && item.user_id === user_id)
        if(issued_book_idx !== -1){
            books_issued[issued_book_idx].is_returned = true;
        }
        console.log("Book returned")
    } else{
        console.log("Book entry not found");
    }
}

console.log(getBookStatus("Movie"));

getAllBookStatus("BOOKS_AVAILABLE");

issueBook(1,1);
issueBook(2,1);
issueBook(3,1);
issueBook(1,1);
issueBook(1,1);

returnBook(1,1)


