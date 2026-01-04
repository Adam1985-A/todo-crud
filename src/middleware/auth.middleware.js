import jwt from "jsonwebtoken";

export const AuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

//check if Header exist and start with authorization
if(!authHeader || !authHeader.startsWith("Bearer ")){
  return res.status(401).json({message: "Authorization Header missing"});
  }

  //extract token
  const token = authHeader.split(" ")[1];
  if(!token){
    return res.status(401).json({message: "token missing"});
  }

  //verify token
  try{
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;
next(); //allow access
  }catch(error){
return res.status(401).json({message: "invalid token"});
  }
};

export default AuthMiddleware;