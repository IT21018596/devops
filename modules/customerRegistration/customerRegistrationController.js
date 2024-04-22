const connection = require('../../dbConnection');
const qrCode = require("qrcode");
const util = require('util');
const toDataURLPromise = util.promisify(qrCode.toDataURL);
const authenticate = require('../middleware/authMiddleware')

const  addMember = async(member) => {
    console.log("Registration controller hit")
    const conn = await connection.getConnection();
    console.log("the member details: ", member)
    const res = await conn.request()
    .input("cFtyCode", member.ftyCode)
    .input("cEPF", member.epf)
    .input("cLibCode", member.libCode)
    .input("cFiratName", member.firstName)
    .input("cLastName", member.lastName)
    .input("cCommonName", member.commonName)
    .input("nDepID", member.depId)
    .input("cSection", member.section)
    .input("cDesignation", member.designation)
    .input("cAddress1", member.address1)
    .input("cAddress2", member.address2)
    .input("cCity", member.city)
    .input("cPermanentAddress", member.permenantAddress)
    .input("cEmailCompany", member.companyEmail)
    .input("cMailPrivate", member.privateEmail)
    .input("cMobileNo", member.mobileNo)
    .input("cLandPhone", member.landNo)
    .input("cPhoneExtenton", member.phoneExtention)
    .input("cRemarks", member.remarks)
    .input("cPassword", member.password)
    .input("cEnterBy", member.enterBy)
    .input("outputMessage", member.msg)
    .execute("Add_LIB_New_Members_Sahan");
    return res;

}

const confirmRegistration = async (member) => {
    const conn = await connection.getConnection();
    let qrURL;

    console.log("the member details: ", member)
    console.log("the member details: ", member.memberID)
  
    const memberQRCode = JSON.stringify({
        memberID: member.memberId,
        epf: member.epf,
        name: member.commonName,
        remarks: member.remarks
    });
  
    try {
        qrURL = await toDataURLPromise(memberQRCode);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to generate QR code" });
    }
  
     
    const res = await conn.request()
    .input("nMemberID", member.memberID)
    .input("cFtyCode", member.ftyCode)
    .input("cEPF", member.epf)
    .input("cLibCode", member.libCode)
    .input("cFiratName", member.firstName)
    .input("cLastName", member.lastName)
    .input("cCommonName", member.commonName)
    .input("nDepID", member.depId)
    .input("cSection", member.section)
    .input("cDesignation", member.designation)
    .input("cAddress1", member.address1)
    .input("cAddress2", member.address2)
    .input("cCity", member.city)
    .input("cPermanentAddress", member.permenantAddress)
    .input("cEmailCompany", member.companyEmail)
    .input("cMailPrivate", member.privateEmail)
    .input("cMobileNo", member.mobileNo)
    .input("cLandPhone", member.landNo)
    .input("cPhoneExtenton", member.phoneExtention)
    .input("cRemarks", member.remarks)
    .input("cUserName", member.userName)
        .input("cUserQRUrl", qrURL)
        .input("outputMassage", member.message)
        .execute("Put_LIB_Members");
  
    return res;
  };


   const getUserRegistrationRequest = async() => {
    
    const conn = await connection.getConnection();

    const request = conn.request();
    request.input('cUserRank', 'REQ');
    const res = await request.execute("Get_LIB_PendingMemberRequest");

    
    return res.recordset;
}

const getAllFactories = async() => {
    const conn = await connection.getConnection();
    const res = await conn.request().execute("Get_LIB_All_Factories");
    return res.recordset;
}

const getMemberDataToregisterMembersByHRD = async(member) => {
    const conn = await connection.getConnection();
    const res = await conn.request()
    .input("cFtyCode", member.ftyCode)
    .input("cEpfNo", member.epf)
    
  
    .execute("Get_LIB_Employee");

    return res.recordset
}

const regiterMembersByHRD = async(member) => {
    //console.log("Registration controller hit")
    const conn = await connection.getConnection();
    

    let qrURL;
  
    const memberQRCode = JSON.stringify({
        
        epf: member.epf,
        name: member.commonName,
        remarks: member.remarks
    });
  
    try {
        qrURL = await toDataURLPromise(memberQRCode);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to generate QR code" });
    }

    console.log("the member details: ", member)
    
    const res = await conn.request()
    .input("cFtyCode", member.ftyCode)
    .input("cEPF", member.epf)
    .input("cLibCode", member.libCode)
    .input("cFiratName", member.firstName)
    .input("cLastName", member.lastName)
    .input("cCommonName", member.commonName)
    .input("cDepatment", member.dep)
    .input("cSection", member.section)
    .input("cDesignation", member.designation)
    .input("cAddress1", member.address1)
    .input("cAddress2", member.address2)
    .input("cCity", member.city)
    .input("cPermanentAddress", member.permenantAddress)
    .input("cEmailCompany", member.companyEmail)
    .input("cMailPrivate", member.privateEmail)
    .input("cMobileNo", member.mobileNo)
    .input("cLandPhone", member.landNo)
    .input("cPhoneExtenton", member.phoneExtention)
    .input("cRemarks", member.remarks)
    .input("cPassword", member.password)
    .input("cEnterBy", member.enterBy)
    .input("cQRUrl", qrURL)
    
    .execute("Add_LIB_New_Members_FromHR");
    return res;
}

module.exports= {   
    addMember,
    confirmRegistration,
    getUserRegistrationRequest,
    getAllFactories,
    getMemberDataToregisterMembersByHRD,
    regiterMembersByHRD
}