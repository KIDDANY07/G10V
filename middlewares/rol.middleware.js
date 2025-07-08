const rol = (...alowedRoles) => (req,res,next)=>{
    const user = req.user
    console.log(user)
    if(!user || !alowedRoles.includes(user.rol)){
        return res.status(403).json({
            status:'Error',
            mensaje:'Acceso denegado'
        })
    }
    next()
}
module.exports = rol