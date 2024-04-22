const app = require('./app');

//var fs = require('fs');
var http = require('http');
//var https = require('https');
//var privateKey  = fs.readFileSync('sslcert/newpkey.key', 'utf8');
//var certificate = fs.readFileSync('sslcert/www_stargarments_lk.crt', 'utf8');

//var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

httpServer.listen("8081",()=>{
    console.log('HTTP Server Started at port:'+"8081");
});