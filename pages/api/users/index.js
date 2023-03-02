// pages/api/hello.js
import UserModel from "@/models/UserModel";
import nc from "next-connect";
const connectDB = require('../../../utils/connectDB');
const bcrypt = require('bcrypt');

connectDB();

const handler = nc({
        onError: (err, req, res, next) => {
            console.error(err.stack);
            res.status(500).end("Something broke!");
        },
        onNoMatch: (req, res) => {
            res.status(404).end("Page is not found");
        },
    })
    .get(async (req, res) => {
        
        try {
            const users = await UserModel.find({});
            res.send(users);
        } catch (error) {
            console.log(error);
        }
    })
    .post(async(req, res) => {
        req.body.password = await bcrypt.hash(req.body.password,11);
        const { name, username, email, country, currency, wallet, password, profile } = req.body;
        const newUser = new UserModel({
            name, 
            username, 
            email, 
            country, 
            currency, 
            wallet, 
            password, 
            profile 
        });

        try {
            await newUser.save();
            res.send('New user created.....');
        } catch (error) {
            console.log(error);
        }
    })
   

export default handler;