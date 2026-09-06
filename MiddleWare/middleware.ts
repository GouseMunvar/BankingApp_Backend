import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


const checkToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);


    const token = authHeader?.split(" ")[1];


    console.log("Extracted Token:", token);


    if (!token) {
      return res.status(401).json({
        message: "Token not provided"
      });
    }


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );


    console.log("Decoded User:", decoded);


    req.user = decoded;


    console.log("User attached to request:", req.user);


    next();


  } catch (error) {

    console.log("JWT Error:", error);


    return res.status(401).json({
      message: "Invalid token"
    });

  }

};


export default checkToken;