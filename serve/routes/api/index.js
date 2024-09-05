var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../../db/index');

var tokenmiddleware = require('../../middleware/tokenmiddleware')

var {KEYTOKRN} = require('../../config')

router.post('/login', function(req, res, next) {  
    let { username, password } = req.body;  
  
    db.query('SELECT * FROM userinfo WHERE username = ? AND password = ?', [username, password], function(err, data) {  
        if (err) {  
            return res.json({  
                code: '500',  
                message: '数据库查询错误',  
                data: null  
            });  
        } 
        if (data.length === 0) {             
            return res.json({  
                code: '401',  
                message: '用户名或密码错误',  
                data: null  
            });  
        }
        
        let token = jwt.sign({username:username,password:password},KEYTOKRN,{expiresIn: 60 * 60 * 24 * 7})
        
        res.json({  
            code: '200',  
            message: '登录成功',  
            data: token,
        });  
    });

});

router.get('/getUserInfo',tokenmiddleware,function(req,res,next){
    
    let {username} = req.user;

    db.query('select * from userinfo where username = ?',[username],function(err,data){
        if(err){
            res.json({
                code:'500',
                message:'服务器失败',
                data:null
            })
        }
        res.json({
            code:'200',
            message:'成功',
            data:data
        })
    })
})

router.post('/createUser',function(req,res,next){
    let {username,password} = req.body;
    let imgUrl = "http://127.0.0.1:3000/images/default.jpg";
    db.query('insert into userinfo (username,password,avatar) values(?,?,?)',[username,password,imgUrl],function(err,data){
        if(err){
            res.json({
                code:'500',
                message:'错误',
                data:null
            })
        }
        res.json({
            code:'200',
            message:'成功',
            data:null
        })
    })
})



module.exports = router;