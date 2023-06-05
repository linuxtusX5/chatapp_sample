import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import Message from '../models/MessageModels.js'

//register
export async function registerController(req, res){
    try {
        const {username, email, password} = req.body;
        //validaton
        if(!username || !email || !password){
            return res.status(400).send({
                success: false,
                message: "Fill all Fields"
            })
        }
        //Existing user
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.status(401).send({
                success: false,
                message: "User Already exist"
            })
        }
        //hashed password
        const hashpassword = await bcrypt.hash(password, 10)

        const user = new UserModel({username, email, password: hashpassword});
        await user.save();
        return res.status(201).send({
            success: true,
            message: "new account created",
            user
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in register!",
            success: false,
            error
        })
    }
}

    //login
    export async function loginController(req, res){
        try {
            const {email, password} =req.body;
            //validation
            if(!email || !password){
                return res.status(401).send({
                    success: false,
                    message: "please provide email or password"
                })
            }
            const user = await UserModel.findOne({email});
            if(!user){
                return res.status(200).send({
                    success: false,
                    message: "email is not registered"
                })
            }
            //password
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(401).send({
                    success: false,
                    message: "Invalid username or password"
                })
            }
            return res.status(200).send({
                success: true,
                message: "login successfully",
                user
            })
        } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in register!",
            success: false,
            error
        })
        }
    }

    // controllers/messageController.j
export async function getMessages(req, res) {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export async function createMessage(req, res){
  try {
    const { text } = req.body;
    const newMessage = new Message({ text });
    const message = await newMessage.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export async function deleteMessage(req, res){
  try {
    const messageId = req.params.id;
    await Message.findByIdAndDelete(messageId);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

