const { connect } = require('http2')
const connection = require('../../dbConnection')
const util = require('util')
const { sql } = require('mssql');
var fs = require('fs');

const path = require('path');
var request = require('request');



const getAllBookCatCodes = async() => {
    const con = await connection.getConnection();
    try {
        const result = await con.request().query("SELECT CONCAT(cCatCode, ' ', cCatname) AS CatCodeAndName FROM LIB_Master_BookCats")

        console.log(result.recordset);
    return result.recordset;
        
    } catch (error) {
        console.error("Error executing query:", error);
    } finally {
       
        con.release();
    }


}

const getAllPublishers = async() => {
    const con = await connection.getConnection();
    try {
        const result = await con.request().query("SELECT cPublisherName FROM LIB_Master_Publishers")

        
    return result.recordset;
        
    } catch (error) {
        console.error("Error executing query:", error);
    } finally {
       
        con.release();
    }

}

const getAllAuthors = async() => {
    const con = await connection.getConnection();
    try {
        const result = await con.request().query("SELECT   cAuthorsName  FROM  LIB_Master_Authors")

        
    return result.recordset;
        
    } catch (error) {
        console.error("Error executing query:", error);
    } finally {
       
        con.release();
    }

}

const insertNewBook = async(book, file) => {
    console.log("insernt new book controller hit")
    console.log(book)
    
    const con = await connection.getConnection();
    const res = await con.request()
    .input("cCatCode", book.catCode)
    .input("nPublishersID", book.pubId)
    .input("nAuthorID", book.authId)
    .input("cBookName", book.bookName)
    .input("cEditionNo", book.editionNo)
    .input("cEdition", book.edition)
    .input("cISBN", book.isbn)
    .input("cTranslater", book.translator)
    .input("cRemarks", book.remarks)
    .input("cCoverFront", book.coverFront)
    .input("cCoverBack", book.backCover)
    .input("cContentPage", book.contentPage)
    .input("cTranstationOf", book.translationOf)
    .input("cEnterBy", book.enterBy)
    .input("frontImage", file.path)
    
    .execute("ADD_LIB_Books");
    return res;
    
}

const getAllBooks = async() => {
    const con = await connection.getConnection();
    try {
        const result = await con.request().query("SELECT  * FROM  LIB_Master_Books")

        
    return result.recordset;
        
    } catch (error) {
        console.error("Error executing query:", error);
    } finally {
       
        con.release();
    }

}

const getAuthorIdByAuthorName = async(author) => {
    //console.log(author.name)
    //console.log("getAuthorIdByAuthorName controller hit")
    
    
    const con = await connection.getConnection();
    const res = await con.request()
    .input("cAuthorsName", author.name)
    
    .input("cEnterBY", author.enterBy)
    
    
    
    .execute("GET_LIB_AuthorsIDByAuthorsName");
    return res.recordset[0];
    
}

const allBooksNames = async() => {
    const con = await connection.getConnection();
    try{
        const result = await con.request().query("select cBookName from LIB_Master_Books")
        return result.recordset


    }catch(error){
        console.log(error)
    }
}

const getPublisherIdByPublisherName = async(publisher) => {
    const con = await connection.getConnection();
    try{
        const result = await con.request()
        .input("cPublisherName", publisher.name)
    
        .input("cEnterBY", publisher.enterBy)
        
        
        
        .execute("GET_LIB_PublishersByPublisherName");
        return result.recordset[0];

    }catch(error){
        console.log(error)
    }
}

const getTheBorrowBookDetails = async(memberID) => {
    const con = await connection.getConnection();
    try{
        const result = await con.request().query(`Select bk.cBookName ,au.cAuthorsName, pb.cPublisherName ,b.dBorrowDate ,b.dExtentionDate ,bi.cBookIndex,b.dSubjectToReturn,DATEDIFF(d,getdate(),b.dSubjectToReturn) as DaysToReturn , bk.frontImage, CONVERT(VARCHAR(10), b.dBorrowDate, 101) AS TrimmedBorrowDate, CONVERT(VARCHAR(10), b.dSubjectToReturn, 101) AS TrimmedSubjectToReturn from [StarLIB].dbo.[LIB_Member_Borrows] b inner join [StarLIB].dbo.LIB_Master_Book_Inventory bi on b.nBookInvID = bi.nBookInvID inner join [StarLIB].dbo.LIB_Master_Books bk on bi.nBookID =bk.nBookID inner join [StarLIB].dbo.LIB_Master_Authors au on bk.nAuthorID =au.nAuthorID inner join [StarLIB].dbo.LIB_Master_Publishers pb on bk.nPublishersID =pb.nPublishersID where nMemberID = '${memberID.memberID}' and dActualReturn is null`)
        return result.recordset
    }catch(error){
        console.log(error)
    }
}

const bookCheckout = async(book) => {
    const con = await connection.getConnection();
    try{
        const result = await con.request()
        .input("nBookBorrowID", book.bId)
    
        .input("nMemberID", book.memberId)
        .input("nBookInvID", book.invId)
        .input("cEnterBy", book.enterBy)
        .input("cRemarks", book.remarks)
        //.output("nRetValue", sql.Int)
            //.output("nRetValue2", sql.Int)      
        .execute("ADD_LIB_BookCheckOut");

        
        return result;

    }catch(error){
        console.log(error)
    }
}

const getBookDetailByINV = async(book) => {
    console.log(book.index)
    const con = await connection.getConnection();
    try{
        const result = await con.request().query(`SELECT
        i.nBookInvID,
        i.nCurrentBorrowMemberID,
        m.cFtyCode,
        m.cEPF,
        m.cFiratName,
        MB.cBookName,
        A.cAuthorsName AS AuthorName
        FROM
        LIB_Master_Book_Inventory i
    JOIN
        LIB_Master_Books MB ON i.nBookID = MB.nBookID
    LEFT JOIN
        LIB_Members m ON i.nCurrentBorrowMemberID = m.nMemberID
    LEFT JOIN
        LIB_Master_Authors A ON MB.nAuthorID = A.nAuthorID
        WHERE i.cBookIndex = '${book.index}' `)
        return result.recordset

    }catch(error){
        console.log(error)
    }
}

const bookCheckIn = async(book) => {
    const con = await connection.getConnection();
    try{
        const result = await con.request()
        .input("cBookIndexID", book.bIndexId)
    
        .input("cReturnby", book.returnBy)
        
        //.output("nRetValue", sql.Int)
            //.output("nRetValue2", sql.Int)      
        .execute("PUT_LIB_BookCheckIn");

        
        return result;

    }catch(error){
        console.log(error)
    }
}

const zebra = async() => {
    const con = await connection.getConnection();
    try{
        const result = await con.request()
        
        
        //.output("nRetValue", sql.Int)
            //.output("nRetValue2", sql.Int)      
        .execute("Sp_GetFRIDdetails");

        
        return result.recordset;

    }catch(error){
        console.log(error)
    }
}

const zebraImage = async(body) => {
    console.log("ZPL data: ", body)
    try{

        var zpl = `^XA^JZY^KL1^SZ2^PR4^MMT^XZ^XA^PON^CF0^FO125,40^A0,16,20^FDTag    
        :^FS^^FO190,40^A0,16,20^FDC ^FS^FO350,40^A0,16,20^FDLay No  :   ^FS^FO425,40^A0,16,20^FDnull^FS^FO125,70^A0,16,20^FDCut ^FS ^FO175,70^A0,16,20^FD:  0000001 ^FS^FO350,70^A0,16,20^FDLOT      : ^FS^FO425,70^A0,16,20^FDCL                                 ^FS^FO125,100^A0,16,20^FDBundle^FS ^FO190,100^A0,16,20^FD:  0002864^FS^FO350,100^A0,16,20^FDUnits^FS^FO420,100^A0,16,20^FD: 20^FS^FO125,135^A0,16,20^FDStyle^FS ^FO175,135^A0,16,20^FD:   2122-0000001^FS^FO350,135^A0,16,20^FDShade  : ^FS^FO425,135^A0,15,18^FD^FS^^FO120,170^A0,16,20^FD Oracle Style :^FS^FO225,170^A0,16,20^FD    null^FS^FO350,170^A0,16,20^FDBPO    : ^FS^FO425,170^A0,15,18^FDLT-1                ^FS^ ^FO125,210^A0,16,20^FDSize^FS ^FO175,210^A0,16,20^FD:  32^FS ^FO125,290^A0,16,20^FDSTK^FS ^FO200,290^A0,16,20^FD: 1-20:2122:F^FS ^FO125,250^A0,16,20^FDColor^FS ^FO200,250^A0,16,20^FD:  null^FS ^FO125,330^A0,16,20^FDRFID No^FS ^FO200,330^A0,16,20^FD:  ^FS ^XB^PQ1^XZ`;

var options = {
    encoding: null,
    formData: { file: zpl },
    // omit this line to get PNG images back
    headers: { 'Accept': 'application/pdf' },
    // adjust print density (8dpmm), label width (4 inches), label height (6 inches), and label index (0) as necessary
    url: 'http://api.labelary.com/v1/printers/8dpmm/labels/4x6/0/'
};

request.post(options, function(err, resp, body) {
    if (err) {
        return console.log(err);
    }
    var filename = 'label.pdf'; // change file name for PNG images
    fs.writeFile(filename, body, function(err) {
        if (err) {
            console.log(err);
        }
    });
});

    }catch(error){
        console.log(error)
    }


}


const zebraPreview = async() => {
    
    const pdfPath = path.join(__dirname, '../../label.pdf')
    const file = fs.readFileSync(pdfPath)
    
    return file;
}

const getLayNUmbers = async(fac) => {

    const con = await connection.getConnection();
    try{
        const result = await con.request()
        
        
        //.output("nRetValue", sql.Int)
            //.output("nRetValue2", sql.Int) 
            .input("cFtyCode", fac.fac)
    
        .input("nCutYear", fac.year)     
        .execute("GET_LayNumbers");

        
        return result.recordset;

    }catch(error){
        console.log(error)
    } 
}

const getCutNosByYearAndFac = async(body) => {

    const con = await connection.getConnection();
    try{
        const result = await con.request()
        
        
        //.output("nRetValue", sql.Int)
            //.output("nRetValue2", sql.Int) 
            .input("cFtyCode", fac.fac)
    
        .input("nCutYear", fac.year)     
        .execute("GET_LayNumbers");

        
        return result.recordset;

    }catch(error){
        console.log(error)
    } 
}




module.exports= {   
    getAllBookCatCodes,
    getAllPublishers,
    getAllAuthors,
    insertNewBook,
    getAllBooks,
    getAuthorIdByAuthorName,
    allBooksNames,
    getPublisherIdByPublisherName,
    getTheBorrowBookDetails,
    bookCheckout,
    getBookDetailByINV,
    bookCheckIn,
    zebra,
    zebraImage,
    zebraPreview,
    getLayNUmbers
}