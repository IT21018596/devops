const bookFunctions = require('./books')
const express = require('express');
const router = express.Router();
const multer = require('multer');


const booksController = require('./booksController')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

class BooksRoutes {
    constructor(app){
        console.log("Books routes hit")
        router.get('/getAllBookCatCodes', bookFunctions.getAllBookCatCodes)
        router.get('/getAllPublishers', bookFunctions.getAllPublishers)
        router.get('/getAllAuthors', bookFunctions.getAllAuthors)
        router.post('/addNewBook', upload.single('file'), async (req, res) => {
            try {
              const response = await booksController.insertNewBook(req.body, req.file); // pass the file to your controller
              res.status(200).json(response)
            } catch (error) {
              console.log(error);
              res.status(400).json(error)
            }
          });

        app.use('/api/v1/books', router)

        router.get('/getAllBooks', bookFunctions.getAllBooks)
        router.get('/allBookNames', bookFunctions.allBookNames)

        router.get('/getAuthorIdByAuthorName/:authorName/:enterBy', bookFunctions.getAuthorIdByAuthorName)
        router.get('/getPublisherIdByPublisherName/:publisherName/:enterBy', bookFunctions.getPublisherIdByPublisherName)
        router.post('/getTheBorrowBookDetails', bookFunctions.getTheBorrowBookDetails)
        router.post('/checkout', bookFunctions.bookCheckout);
        router.post('/getBookDetailByINV', bookFunctions.getBookDetailByINV);
        router.post('/checkIn', bookFunctions.bookCheckIn);
        router.get('/zebra', bookFunctions.zebra)
        router.post('/zebraImage', bookFunctions.zebraImage)
        router.get('/zebraPreview', bookFunctions.zebraPreview)
        router.post('/layNos', bookFunctions.getLayNumbers)
    }
}module.exports = BooksRoutes;