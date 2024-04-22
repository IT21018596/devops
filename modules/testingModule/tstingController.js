const mssqlcon = require('../../dbConnection');
class ProductMSSql {
  async getAllProducts() {
    const conn = await mssqlcon.getConnection();
    const res = await conn.request().execute("getAllTesting");
    return res.recordset;
  }
  
 
 
}
module.exports = new ProductMSSql();