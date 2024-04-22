const booksController = require("./booksController")

class Books {

    async getAllBookCatCodes(req, res){
        try{
            const codes = await booksController.getAllBookCatCodes();
            res.send(codes)

        }catch(error){
            console.log(error)
        }
    }

    async getAllPublishers(req, res){
        try{
            const pubs = await booksController.getAllPublishers();
            res.send(pubs)
        }catch(error){
            console.log(error)
        }
    }

    async getAllAuthors(req, res){
        
        try{
            const authors = await booksController.getAllAuthors();
            res.send(authors)
        }catch(error){
            console.log(error)
        }
}

async insertNewBook(req, res){
    try{
        const response = await booksController.insertNewBook(req.body);
        res.send(response)

    }catch(error){
        console.log(error)
    }
}

async getAllBooks(req, res){
    try{
        const response = await booksController.getAllBooks();
        res.send(response)

    }catch(error){
        console.log(error)
    }
}

async getAuthorIdByAuthorName(req, res){
    try{
        
        const headersData = {
            name: req.params.authorName,
            enterBy: req.params.enterBy
        };
        
        const response = await booksController.getAuthorIdByAuthorName(headersData);
        res.send(response)
    }catch(error){
        console.log(error)
    }
}

async allBookNames(req, res){
    try{
        const response = await booksController.allBooksNames();
        res.send(response);
    }catch(error){
        console.log(error)
    }
}

async getPublisherIdByPublisherName(req, res){
    try{
        const headersData = {
            name: req.params.publisherName,
            enterBy: req.params.enterBy
        };
        const respose = await booksController.getPublisherIdByPublisherName(headersData);
        res.send(respose);

    }catch(error){
        console.log(error)
    }
}

async getTheBorrowBookDetails(req, res){
    
    try{
        const response = await booksController.getTheBorrowBookDetails(req.body);
        res.send(response)

    }catch(error){
        console.log(error)
    }
}

async bookCheckout(req, res){
    try{
        const response = await booksController.bookCheckout(req.body);
        res.send(response)
    }catch(error){
        console.log(error)
    }
}

async getBookDetailByINV(req, res){
    
    try{
        const response = await booksController.getBookDetailByINV(req.body)
        res.send(response)
    }catch(error){
        console.log(error)
    }
}

async bookCheckIn(req, res){
    try{
        const response = await booksController.bookCheckIn(req.body)
        res.send(response)
    }catch(error){
        console.log(error)
    }
}

async zebra(req, res){
    try{
        const response = await booksController.zebra()
        res.send(response)
    }catch(error){
        console.log(error)
    }
}

async zebraImage(req, res){
    try{
        const response = await booksController.zebraImage(req.body)
        res.send(response)
    }catch(error){
        console.log(error)
    }
}

async zebraPreview(req, res){
    try{
        const response = await booksController.zebraPreview()
        console.log("sssssssssss", response)
        res.send(response)
    }catch(error){
        console.log(error)
    }
}

async getLayNumbers(req, res){
    try{
        const response = await booksController.getLayNUmbers(req.body)
        res.send(response)
    }catch(error){
        console.log(error)
    }
}

}




module.exports = new Books();