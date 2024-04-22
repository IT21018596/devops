const customerController = require("./customerRegistrationController")

class CustomerRegistration {


    async addNewMember(req, res){
        console.log("ddddddddddddddddd")
        try{
            const member = await customerController.addMember(req.body);
            res.send(member)
        }
        catch(error){
            if (error.number === 2627) { 
                res.status(400).send({ error: 'Duplicate key violation. Member already exists.' });
            } else {
                console.error(error);
                res.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

    async memberRegistration(req, res){
        try{
            console.log("boddyyyyyyyyyyyyyyyyyyyyyyy", req.body)
            const member = await customerController.confirmRegistration(req.body);
            res.send(member)
        }
        catch(error){
            console.log("this is the error:", error)
        }
    }


    async getRegistrationRequest(req, res) {

        try{
            const output = await customerController.getUserRegistrationRequest();
            res.status(200).json(output)

        }catch(error){
            res.status(400).json(error)
            console.log(error)
        }
    }

    async getAllFactories(req, res){
        try{
            const output = await customerController.getAllFactories();
            res.status(200).json(output)
        }catch(error){
            res.status(400).json(error)
            console.log(error)
        }
    }


    async getMemberDataToregisterMembersByHRD(req, res){
        try{
            const output = await customerController.getMemberDataToregisterMembersByHRD(req.body);
            res.status(200).json(output)
        }catch(error){
            res.status(400).json(error)
            console.log(error)
        }
    }

    async registerMembersByHRD(req, res){
        try{
            const result = await customerController.regiterMembersByHRD(req.body);
            res.status(200).json(result)
        }catch(error){
            res.status(400).json(error)
            console.log(error)
        }
    }







}
module.exports = new CustomerRegistration();