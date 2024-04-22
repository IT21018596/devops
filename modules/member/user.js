const userController = require("./userController")

class User {


    async getMember(req, res){
        console.log("ccccccc")
        try{
            const member = await userController.getMember(req.body);
            res.send(member)
        }
        catch(error){
            console.log(error)
        }
    }

    async getMemberByFactCodeAndEpf(req, res){
        try{
            const member = await userController.getMemberByFactCodeAndEpf(req.body);
            res.send(member)
        }catch(error){
            console.log(error)
        }
    }

    async loginHandler(req, res){
        console.log("HITTTTTTTTTTTTTTTT")
        try{
            const result = await userController.loginHandler(req.body, res);
            res.send(result)
        }
        catch(error){
            console.log(error)
        }
            
            
    
        
    }

    async getAllMembers(req, res){
        try{
            const result = await userController.getAllMembers();
            res.send(result);
        }catch(error){
            console.log(error)
        }
    }

    



}
module.exports = new User();