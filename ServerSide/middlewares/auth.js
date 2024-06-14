//auth

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try{
        //extract JWT token
        const token = req.body.token;
        console.log(token);

        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            }); 
        }

        //verify the token 
        try {
            //verify function will give the data pass in token by verifying with the secret code 
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.body = decode;
        } catch(err) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            })
        }
        next();

    } catch(error) {
        return res.status(401).json({
            success:false,
            message: 'Something went wrong while verifying the token',
        })

    }
}