class Module {
    constructor(app) {
       this.app = app;
    }
   init() {
    const TestingRoutes = require('./testingModule/testingRoutes')
    new TestingRoutes(this.app);

    const MemberRegistration = require('./customerRegistration/customerRegistrationRoutes')
    new MemberRegistration(this.app)

    const Member = require('./member/userRoutes')
    new Member(this.app)

    const Books = require('./books/bookRoutes')
    new Books(this.app)

   }
  }
  

 module.exports = Module