import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


const checkToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const token = req.headers.authorization?.split(" ")[1];


    if (!token) {
      return res.status(401).json({
        message: "Token not provided"
      });
    }


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );


    req.user = decoded;


    next();


  } catch (error) {

    return res.status(401).json({
      message: "Invalid token"
    });

  }

};



export default checkToken;