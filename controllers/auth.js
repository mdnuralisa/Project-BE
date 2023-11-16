import user from "../model/user.model.js";
import categories from "../model/categories.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    const { email, password } = req.body;
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedValue = bcrypt.hashSync(password, salt);
  
      const newUser = await user.create({
        email: email,
        password: hashedValue,
      });

      await categories.bulkCreate([
        {name: 'Kitchen', userId: newUser.id},
        {name: 'Laundry', userId: newUser.id},
        {name: 'Toiletries', userId: newUser.id},
        {name: 'Kids', userId: newUser.id}
      ])

      res.status(200).json({
        message: "New user created",
        data: { email: newUser.email },
      });
    } catch (error) {
      //   send res status 500 - server error
      res.status(500).json({ message: "Server error", error: error });
    }
  };

const login = async (req, res) =>{
    const { email, password } = req.body;
    try {
// query user based on email
        const User = await user.findOne({
          where: {
            email: email,
          },
        });

        // No user return
    //   if user not found return 404
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }

        // compare hash
        const isMatch = await bcrypt.compare(password, User.password);
        
        // create access token
        const token = jwt.sign({id: User.id}, "secret-key-here");

            // compare password from body with database
        if (isMatch){
            res.status(200).json({message: "User log in", data: {token: token} });
            return
        } else {
            res.status(401).json({message: "Credential Invalid"});
            return
        }
       
    } catch (error) {
        //   send res status 500 - server error
    res.status(500).json({ message: "Server error", error: error });
    }
}

const publicController = (req,res)=>{
    res.status(200).json({ message: "Public route"});
}

const protectedController = (req,res)=>{
    res.status(200).json({ message: "Protected route", data: { user: req.user}});
}

const authController = { register, login, publicController, protectedController };

export default authController;