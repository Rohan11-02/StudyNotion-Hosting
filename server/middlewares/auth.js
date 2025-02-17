const jwt = require("jsonwebtoken");
require("dotenv").config(); 
// auth 
exports.authN = async(req, res, next) => {
    try{
        const token = req.body.token || req.cookies.token || 
        req.header("Authorization").replace("Bearer ","");

        if(!token){
            return res.status(404).json({
                success : false,
                message : "Token is Missing"
            })
        }
    
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
        }
        catch(err){
            return res.status(400).json({
                success : false,
                message : "Token is not Valid."
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Failed to authN token."
        })
    }
}

// isStudent
exports.isStudent = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(400).json({
                success : false,
                message : "This is a Protected route for Students Only"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Failed to authN Student"
        })
    }
}

// isAdmin
exports.isAdmin = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(400).json({
                success : false,
                message : "This is a Protected route for Admin Only"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Failed to authN Admin"
        })
    }
}

// isInstructor
exports.isInstructor = (req, res, next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(400).json({
                success : false,
                message : "This is a Protected route for Instructors Only"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success : false,
            error : err,
            message : "Failed to authN Instructor"
        })
    }
}