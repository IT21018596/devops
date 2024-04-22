const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//const auth=require('./middleware/auth')
var cors = require('cors')

async function init() {
 
    app.get('/',(req,res)=>{
       res.send("Middleware ERP API");
    })
 
    //app.use(bodyparser.json({ limit: '50mb' }));
    //app.use(bodyparser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
 
    app.use(express.urlencoded({extended: true}));
    app.use(express.json())

    app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 
    //app.use(cors())
    app.use(cors({origin: '*'}));
 
    //user=require('./authentication/user')
    //app.use('/api/v1/login',user)
    
    //app.use(auth)
 
    //users=require('./utilities/users')
    //app.use('/api/v1/users',users)




 
    const approuting = require('./modules');
    const appmodules = new approuting(app);
    appmodules.init();
 }
 init();
 module.exports = app;