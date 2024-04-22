const testMssql = require('./tstingController');
class product {
    async getTable(req, res) {
      try {
         const output = await testMssql.getAllProducts();
         res.send(output);
         
      }
      catch (error) {
      res.status(400).json(error)

      console.log(error);
    }
 }


}
module.exports = new product();