// import UserModel from "@/models/UserModel";
// import nc from "next-connect";
// const connectDB = require('../../../utils/connectDB');
// const bcrypt = require('bcrypt');

// connectDB();

// const handler = nc({
//         onError: (err, req, res, next) => {
//             console.error(err.stack);
//             res.status(500).end("Something broke!");
//         },
//         onNoMatch: (req, res) => {
//             res.status(404).end("Page is not found");
//         },
//     })
//     .delete(async (req, res) => {
        
//         try {
//             await UserModel.findOneAndDelete({_id: req.query.id})
//             res.send('User Deleted Success');
//         } catch (error) {
//             console.log(error);
//         }
//     })
//     .put(async(req, res) => {
//         try {
//             const user = await UserModel.findOne({_id: req.query.id});
//             user.name = req.body.name;
//             user.username = req.body.username;
//             user.email = req.body.email;
//             user.country = req.body.country;
//             user.currency = req.body.currency;
//             user.wallet = req.body.wallet;
//             user.password = req.body.password = await bcrypt.hash(req.body.password,11);
//             user.profile = req.body.profile;
//             await user.save();
//             res.send('User Updated!!.....');
//         } catch (error) {
//             console.log(error);
//         }
//     })
// export default handler;


import connectDB from '../../../utils/connectDB'
import User from '../../../models/UserModel'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await connectDB()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const user = await User.findById(id)
        if (!user) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!user) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedUser = await User.deleteOne({ _id: id })
        if (!deletedUser) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}