const { copyFileSync } = require('fs');
const connection = require('../../dbConnection');
const qrCode = require("qrcode");
const util = require('util');
const toDataURLPromise = util.promisify(qrCode.toDataURL);
const jwt = require('jsonwebtoken')

const  getMember = async(member) => {
    //console.log(member)
    const conn = await connection.getConnection();
console.log(member)

    const res = await conn.request()
    .input("nMemvarID", member.memberID)
    
        
    .execute("Get_LIB_Member_Records");
    return res.recordset;

}

const getMemberByFactCodeAndEpf = async(member) => {
    const conn = await connection.getConnection();
    try{
        const result = await conn.request().query(`SELECT
        s.bBookBorrow,
        s.cMemberStatus,
        m.nMemberID,
        m.cFtyCode,
        m.cLibCode,
        m.cFiratName,
        m.cLastName,
        m.cCommonName,
        MD.cDepartmentName AS DepartmentName, -- Select department name instead of ID
        m.cSection,
        m.cDesignation,
        m.cAddress1,
        m.cAddress2,
        m.cCity,
        m.cPermanentAddress,
        m.cEmailCompany,
        m.cMailPrivate,
        m.cMobileNo,
        m.cLandPhone,
        m.cPhoneExtenton,
        m.cRemarks,
        m.nStatusID,
        s.cMemberStatus,
        
        m.nBookCount,
        m.dRegisteredOn,
        r.cMemberRank,
        m.dResingOn,
        m.dEnterDate,
        m.cEnterBy,
        m.dEditDate,
        m.cEditBy,
        m.cUserQRUrl
        FROM
        LIB_Members m
    INNER JOIN
        starLib.dbo.LIB_Master_MemberRank r ON m.cMemberRankCode = r.cMemberRankCode
    INNER JOIN
        [dbo].[LIB_Master_Member_Status] s ON m.nStatusID = s.nStatusID
    INNER JOIN
        LIB_Master_Department MD ON m.nDepID = MD.nDepartmentID
         where m.cFtyCode = '${member.ftyCode}' and m.cEPF = '${member.epf}' `)
        return result.recordset

    }catch(error){
        console.log(error)
    }
}

//Create jwt
const createToken = (userRank, libCode) => {
    return jwt.sign({userRank, libCode}, 'erbr4br634b6erbt6b1s36trb1', {
        expiresIn: '1h'
    })
}

//Login handler
const loginHandler = async (member,res) => {
    
    try {
        console.log("login hit")
        const conn = await connection.getConnection();
        const result = await conn.request()
            .input("cFtyCode", member.ftyCode)
            .input("cEpfNo", member.epf)
            .input("cPassWord", member.password)
            .execute("Get_TestLIB_MemberAccount");

        if (result.recordset !== null) {
            const user = { rank: result.recordset[0].cMemberRankCode, libCode: result.recordset[0].cLibCode};
            const token = createToken(user.rank, user.libCode);
console.log(result.recordset[0].cLibCode)
            // Set the token as an HTTP-only cookie in the response
            //res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`);
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
            
            //return result.recordset[0].cMemberRankCode;

            return token;
        } else {
            console.log("Recordset is null");
            
            return { error: "Recordset is null" };
        }
    } catch (error) {
        console.log(error);
        
        
    }
};

const getAllMembers = async () => {
    try{
        const conn = await connection.getConnection();
        const result = await conn.request().query("SELECT  nMemberID, cEPF, cFtyCode, cFiratName, cDesignation   FROM  LIB_Members where cMemberRankCode = 'MEM'")

        
    return result.recordset;


    }catch(error){
        console.log(error)
    }
}




module.exports= {   
    getMember,
    createToken,
    loginHandler,
    getAllMembers,
    getMemberByFactCodeAndEpf
    
}