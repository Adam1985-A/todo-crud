import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "../database/data-source.js";
import UserEntity from "../entity/user.entity.js";

export class AuthService{
  constructor(){
    this.repository = AppDataSource.getRepository(UserEntity);
  }
  async register(email, password){
    const existingUser = await this.repository.findOneBy({email});
  if(existingUser){
    throw new Error("User already existed");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.repository.create({email, password: hashedPassword});
    return await this.repository.save(user);
  }

  async login(email, password){
    const user = await this.repository.findOneBy({email});
  
  if(!user){
    throw new Error("Invalid email or password");
  }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      throw new Error("Invalid credential");
    }
      const token = jwt.sign(
        {userId: user.id, email: user.email},
        process.env.JWT_SECRET,
        { expiresIn: "1d"}

      );
      return { token };
     }
};

export default AuthService;