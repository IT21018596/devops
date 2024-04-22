const mssql = require('mssql');
require('dotenv').config();


class DBConnection {
  async getConnection() {
     try {
       return await mssql.connect({
              user: process.env.DBUSER,
              password: process.env.DBPASSWORD,
              server: process.env.DBSERVER,
              database: process.env.DBDATABASE,
              
              options: {
                trustedConnection: true,
                enableArithAbort: true,
                trustServerCertificate: true,
                encrypt:false
              },
              
              port:1433
              
       });
    }
    catch(error) {
      console.log(error);
    }
  }
}
module.exports = new DBConnection();