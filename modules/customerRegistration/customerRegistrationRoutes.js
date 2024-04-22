const CustomerRegistrationFunctions = require('./customerRegistration');
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware')


class CusomerRegistrationRoutes {
    
    constructor(app){
        console.log("routes hit")
        router.post('/', CustomerRegistrationFunctions.addNewMember);
        router.post('/confirmRegistration', CustomerRegistrationFunctions.memberRegistration)

        router.get('/getPendingMembers', authenticate, CustomerRegistrationFunctions.getRegistrationRequest)

        router.get('/getAllFactories', CustomerRegistrationFunctions.getAllFactories)
        router.post('/getMemberDataToregisterMembersByHRD', CustomerRegistrationFunctions.getMemberDataToregisterMembersByHRD)
        router.post('/regiterMembersByHRD', CustomerRegistrationFunctions.registerMembersByHRD)
        app.use('/api/v1/registration', router)
    }
}

module.exports = CusomerRegistrationRoutes;






