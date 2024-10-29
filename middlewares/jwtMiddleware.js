const jwt=require('jsonwebtoken')

// middleware
const jwtMiddleware=(req,res,next)=>{
    console.log("inside jwt middleware");
    // get token from req header "authorization" key
    const token=req.headers["authorization"].split(" ")[1]
    console.log(token);
    // steps to verify token
    if(token){ 
        try{
        const jwtResponse=jwt.verify(token,process.env.JWT_PASSWORD)
        console.log(jwtResponse);
        req.userId=jwtResponse.userId
        next()
    }
    catch{
        res.status(401).json("Please login to proceed")
    }
  }
  else{
    res.status(406).json("Token missing")
  }
}

module.exports=jwtMiddleware