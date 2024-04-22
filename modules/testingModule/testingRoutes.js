const testing = require('./testing');
const express = require('express');
const router = express.Router();

class TestingController {
    constructor(app) {
        console.log("testing routes hit")
        router.get('/', testing.getTable);
        
        app.use('/api/v1/testing', router);
    }
}
module.exports = TestingController;