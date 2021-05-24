const { response } = require("express")
const jwt = require("jsonwebtoken")


const validarJWT = (req, res=response, next) => {
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            ok:false,
            msg: "no hay token"
        })
    }
    try {

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.uid=payload.uid
        req.name=payload.name
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: "token no valido"
        })
    }
    next();
}

module.exports = {
    validarJWT
}