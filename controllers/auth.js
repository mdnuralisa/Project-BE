import { query } from "../database/connection.js";
import bcrypt from "bcryptjs";

const register = async ( req, res) =>{
    try {
        const reqBody = req.body;
        //hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedValue = bcrypt.hashSync(reqBody.password, salt);

            await query("INSERT INTO users (email, username, password) VALUES ($1, $2, $3)", [reqBody.email, reqBody.username, hashedValue]);
    
        res.status(200).json({message: "New user created", data: {email: reqBody.email, username: reqBody.username}});
    } catch (error) {
         //   send res status 500 - server error
    res.status(500).json({ message: "Server error", error: error });
    }
};

const login = async (req, res) =>{
    try {
        const reqBody = req.body;
        const resDB = await query ("SELECT * FROM users WHERE email = $1", [
            reqBody.email,]);

        // No user return
        if (resDB.rowCount === 0){
            res.status(401).json({message: "Unauthorised"});
            return
        }
            const userData = resDB.rows[0];

        // compare hash
        const isMatch = await bcrypt.compare(reqBody.password, userData.password);
        console.log(isMatch);

            // compare password from bosy with database
        if (reqBody.password === userData.password){
            res.status(200).json({message: "User log in", data: userData});
            return
        } else {
            res.status(401).json({message: "Unauthorised"});
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
    const loggedIn = true;
    if (loggedIn) {
        res.status(200).json({ message: "Protected route"});
    } else {
        res.status(401).json({message: "Unauthorised"});
    }
    
}

const authController = { register, login, publicController, protectedController };

export default authController;