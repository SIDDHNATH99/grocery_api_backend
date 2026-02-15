function errormiddleware(err , req , res , next){
    console.log("middleware" , err.stack)
    res.status(500).json({ error: "Internal Server Error" });
}

module.exports = errormiddleware;