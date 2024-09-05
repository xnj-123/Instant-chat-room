const jwt = require('jsonwebtoken')
const {KEYTOKRN} = require('../config') 

module.exports = (req,res,next)=>{
    let token = req.get('token');
    if(!token){
        return res.json({
            code:403,
            message:'token缺失',
            data:null
        })
    }

    try {
        let tokenkey = jwt.verify(token , KEYTOKRN);
        req.user = tokenkey
        next();

    } catch (error) {
        res.json({
            code:404,
            message:'校验失败',
            data:null
        })
    }
}